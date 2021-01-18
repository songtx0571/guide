if (typeof jQuery !== "undefined" && typeof saveAs !== "undefined") {
    (function($) {
        $.fn.wordExport = function(fileName) {
            fileName = typeof fileName !== 'undefined' ? fileName : "jQuery-Word-Export";
            var static = {
                mhtml: {
                    top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
                    head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",
                    body: "<body>_body_</body>"
                }
            };
            var options = {
                maxWidth: 624
            };
            // Clone selected element before manipulating it
            var markup = $(this).clone();
 
            // Remove hidden elements from the output
            markup.each(function() {
                var self = $(this);
                if (self.is(':hidden'))
                    self.remove();
            });
 
            // Embed all images using Data URLs
            var images = Array();
            var img = markup.find('img');
            for (var i = 0; i < img.length; i++) {
                // Calculate dimensions of output image
                var w = Math.min(img[i].width, options.maxWidth);
                var h = img[i].height * (w / img[i].width);
                // Create canvas for converting image to data URL
                var canvas = document.createElement("CANVAS");
                canvas.width = w;
                canvas.height = h;
                // Draw image to canvas
                var context = canvas.getContext('2d');
                context.drawImage(img[i], 0, 0, w, h);
                // Get data URL encoding of image
                var uri = canvas.toDataURL("image/png");
                $(img[i]).attr("src", img[i].src);
                img[i].width = w;
                img[i].height = h;
                // Save encoded image to array
                images[i] = {
                    type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                    encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                    location: $(img[i]).attr("src"),
                    data: uri.substring(uri.indexOf(",") + 1)
                };
            }
 
            // Prepare bottom of mhtml file with image data
            var mhtmlBottom = "\n";
            for (var i = 0; i < images.length; i++) {
                mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
                mhtmlBottom += "Content-Location: " + images[i].location + "\n";
                mhtmlBottom += "Content-Type: " + images[i].type + "\n";
                mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
                mhtmlBottom += images[i].data + "\n\n";
            }
            mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";
 
            //TODO: load css from included stylesheet
            var styles = "div{text-align: center;font-family:'Hiragino Sans GB W3';}span,h1{font-family:'SimSun';}table{ "+
            " margin: auto;text-align:center;font-family:'Hiragino Sans GB W3';border:0.5px solid #000;border-collapse:collapse;"+
            " border-radius: 5px;font-size: 14pt;background: rgba(240,240,240,0.8);width: 100%;} "+
            " th{border:0.5px solid #000;border-collapse:collapse;font-size: 14pt;font-weight:bold;line-height: 30px;} "+
            " td{vertical-align:middle;border:0.5px solid #000;border-collapse:collapse;line-height: 30px;font-size: 14pt;align:center;} "+
            " #tdleft{text-align: left;padding-left: 5px;}td[id='failure']{cursor:pointer;}#tbody-1 tr:FIRST-CHILD{background-color: rgba(240,135,0,0.3);} "+
            " #tbody-2 tr:FIRST-CHILD{background-color: rgba(216,0,120,0.3);}input[type='text']{border:1px solid rgba(0,0,0,0.1);border-radius: 2px;} "+
            " input[type='button']{background:#eee;padding:2px 10px;border-radius:4px;border: 0;}input[type='button']:HOVER{background:rgb(0,161,233);color:#eee;border-radius:4px;cursor:pointer;border: 0;} "+
            " input[type='checkbox']{zoom:150%;}input[type='checkbox']:HOVER {cursor:pointer;}input[type='radio']{cursor:pointer;} "+
            " select::-ms-expand { display: none; }select{border-radius: 2px;margin: 0;margin-right: 18px;margin-left: 6px;font-family:'Hiragino Sans GB W3'; "+
            " font-size: 14pt;height: 24px;appearance:none;	-moz-appearance:none;	-webkit-appearance:none; "+
            " background:url('../img/select.png');background-position:97% 50%;background-size:12px 12px;background-repeat:no-repeat; "+
            " background-color:#F1F1F1;padding: 1px;padding-right: 15px;padding-left: 5px;} "+
            " .span{margin:0;height:24px;font-family:'SimSun';font-size: 16px;padding: 2px;} "+
            " h3{width:20%;margin:1em auto;border:0.05em solid rgba(0,0,0,0.1); border-radius: 5px;padding: 5px;background: #F1F1F1;display:inline;} "+
            " label:HOVER{cursor:pointer;}.tendency{cursor:pointer;}"+
            " textarea{margin-top:0;padding:0;padding-left:1%;width: 99%;height: 99%;resize: none;border:none;font-size: 1em;vertical-align:middle;} "+
            " #query{background:url('../img/query.png');background-color: #f1701a;background-size:14px 14px;background-position:90% 50%;"+
            " background-repeat:no-repeat;font-family:'Hiragino Sans GB W3';height: 24px;width: 60px;font-size:14px;border-radius: 3px;"+
            " color: #fff;text-align: left;padding-left: 5px;padding-right: 0;vertical-align:middle;border: 0;outline:none;} "+
            " #query:HOVER{background-color: #008eff;border: 0;}#print{margin-right:15%;margin-bottom: 0;float: right;} "+
            " img{width: 28px;height: 28px;vertical-align: middle;margin-right: 6px;margin-left: 6px;}img:HOVER {cursor:pointer;}" +
            " #time{float: right;padding-bottom: 6px}#people{float: left;padding-bottom: 6px}h2{text-align: center;}";
 
            // Aggregate parts of the file together
            var fileContent = static.mhtml.top.replace("_html_", static.mhtml.head.replace("_styles_", styles) + static.mhtml.body.replace("_body_", markup.html())) + mhtmlBottom;
 
            // Create a Blob with the file contents
            var blob = new Blob([fileContent], {
                type: "application/msword;charset=utf-8"
            });
            saveAs(blob, fileName + ".doc");
        };
    })(jQuery);
} else {
    if (typeof jQuery === "undefined") {
        console.error("jQuery Word Export: missing dependency (jQuery)");
    }
    if (typeof saveAs === "undefined") {
        console.error("jQuery Word Export: missing dependency (FileSaver.js)");
    }
}
