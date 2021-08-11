/**
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * Istvan Jano janoist1@gmail.com
 * Vitaliy Filippov vitalif@yourcmc.ru
 */

var collectedStyleElementId = "__universalLoaderStyles";
var collectedStyleSingleton = true;
var collectedStyles = [];

/**
 * Add styles - used by the loader
 *
 * @param list
 * @param options
 */
function addStyles(list, options)
{
    // By default, use "__universalLoaderStyles" as the ID of style element
    collectedStyleElementId = options && options.elementId || "__universalLoaderStyles";
    collectedStyleSingleton = !options || options.singleton == undefined ? true : options.singleton;
    var newStyles = {};
    // default is for ES6 CSS modules
    list = list.default || list;
    for (var i = 0; i < list.length; i++)
    {
        var item = list[i];
        var id = item[0];
        var css = item[1];
        var media = item[2];
        var sourceMap = item[3];
        var part = { css: css, media: media, sourceMap: sourceMap };
        if (!newStyles[id])
            collectedStyles.push(newStyles[id] = { id: id, parts: [ part ]})
        else
            newStyles[id].parts.push(part)
    }
}

/**
 * Return the styles that have been collected so far as array
 *
 * @returns object[]
 */
function getStyleList()
{
    return collectedStyles;
}

/**
 * Return the styles that have been collected so far as a <style>
 * element code ready for insertion into <head>
 *
 * @returns string
 */
function getStyles()
{
    if (collectedStyleSingleton)
    {
        return "<style type=\"text/css\" id=\""+collectedStyleElementId+"\">"+
            collectedStyles.map(style => style.parts.map(part => part.css + "\n").join('')).join('')+
        "</style>";
    }
    else
    {
        return collectedStyles.map((style, idx) =>
            "<style type=\"text/css\" id=\""+collectedStyleElementId+idx+"\">"+
            style.parts.map(part => part.css + "\n").join('')+
            "</style>"
        ).join('');
    }
}

module.exports.addStyles = addStyles;
module.exports.getStyleList = getStyleList;
module.exports.getStyles = getStyles;
