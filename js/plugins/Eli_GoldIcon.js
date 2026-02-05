//==========================================================================
// Eli_GoldIcon.js
//==========================================================================

/*:

@plugindesc ♦5.0.0♦ Let you replace the currency unit with escape codes.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/hakuen-studio-gold-icon-for-rpg-maker-mv-mz

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
==============================================================================
Plugin Requirements
==============================================================================

Order After Eli Global Text

==============================================================================
Features
==============================================================================

• Let you replace the Currency unit with an icon.

==============================================================================
How to use
==============================================================================

Go to the Database > System 1 > Currency
And change the currency to a escape code:
\i[iconIndex]

And that is it.

============================================================================
Update Log
============================================================================

https://tinyurl.com/goldIconLog

============================================================================

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_GoldIcon = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.GoldIcon = {

    version: 5.00,
    url: "https://hakuenstudio.itch.io/hakuen-studio-gold-icon-for-rpg-maker-mv-mz",
    parameters: {},
    alias: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){},

    initPluginCommands(){},

    getGoldIcon(text){
        const lowerText = text.toLowerCase()
        const start = lowerText.indexOf("i[") + 2
        const end = lowerText.indexOf("]")
        const icon = lowerText.substring(start, end)

        return icon
    },

}

const Plugin = Eli.GoldIcon
const Alias = Eli.GoldIcon.alias

/* ------------------------------- WINDOW BASE ------------------------------ */
{

Alias.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters
Window_Base.prototype.convertEscapeCharacters = function(text){
    text = text.replace(/\x1bG/gi, () => {
        const goldIcon = Plugin.getGoldIcon(TextManager.currencyUnit)
        return `\x1bI\[${goldIcon}]`
    })
    text = Alias.Window_Base_convertEscapeCharacters.call(this, text)

    return text
}

}

/* ------------------------------- WINDOW GOLD ------------------------------ */
{

//Overwrite
Window_Gold.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
    const unitWidth = this.getTextWidth(unit)
    const valueWidth = this.getTextWidth(String(value))
    const iconX = this.contentsWidth() - unitWidth
    const valueX = iconX - valueWidth - this.getItemPadding()
    
    this.resetTextColor()
    this.contents.clear()
    this.drawTextEx(String(value), valueX, y, valueWidth)
    this.changeTextColor(this.systemColor())
    this.drawTextEx(unit, iconX, y, unitWidth)
}

}

}