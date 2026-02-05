//============================================================================
// Eli_ClassCurves.js
//============================================================================

/*:
@plugindesc ♦5.0.1♦ Make a custom growth stats for classes independent of the editor.
@author Hakuen Studio

@help 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Features
============================================================================

• Add a status curve for each standard parameter, fully customizable and 
independent of the editor.
• You can use fixed values.
• You can use random values.
• You can use values ​​within a minimum and maximum range.
• You can use formulas.
• Works for enemies, if you are using EliMZ_EnemyClass.js
• Works with custom parameters, if you are using EliMZ_CustomParameters.js
• Growth chance value, which allows you to control when a parameter will 
increase or not on level up. Similar to the Fire Emblem series.
• Change growth chance rate based on items, equipment, skills, or state!
• Decide if an actor will always join in the party with initial stats, 
regarding its level.

============================================================================
How to use
============================================================================

♦ Plugin Parameters ♦

● Minimum Stats parameter

This is the minimum value for all classes at level zero. 
You can leave it the way it is, but you can also change.

● Preset Class Curves

Here is where you will build your Custom Curves.
You notice 5 other parameters in there:

• Name → The name of the curve to be referenced in the Data note field.
• Growth Chance → The chance rate for the parameter increase when leveling up.
• Initial → The initial value of level 1 for this class.
• Min → The minimum amount the actor can earn when leveling up.
• Max → The maximum amount an actor can earn when leveling up.
• Cap → The maximum value that a parameter can reach in this class.
• Bonus → Used on the Class Promotion Plugin.

■ Observations:

NOTE¹: By default, the growth chance will always be 100%. Which means that 
every time an actor level up, the parameter will take the value set on the 
min and max.
If you set another value than 100, the actor can raise a level but not 
always get a chance to increase the stats. 

You can build as many as you want.

♦ Data Note Fields ♦

• Now you only need to use the following on the Class notes field.
<CustomCurve:Name>

Optionally, you can change the Growth Chance rate in-game through the 
use of items, skills, states, and equipments.
You just need to use the following note tags:

<GrowthChanceParam: param:value, param:value>

Replace "param" with one of the following:
mhp, mmp, atk, def, mat, mdf, agi, luk

Or if using Eli Custom Parameter:

<GrowthChanceCParam: Cparam:value, Cparam:value>

Replace "Cparam" with the short name of the custom parameter.

***ATTENTION! All notes are case sensitive!***

■ Observations:

• By default, if an actor joins the party at a level higher than 1, the 
plugin will calculate the level-ups automatically.
But you can also prevent this from happening, and let the actor joins in 
the party always with initial stats, independent of the level.
Just use the note tag on the Actor note field:
<HoldCurve: Level>

It will hold the initial stats until the specified level.

If you do not set a custom curve to a class note field, it will take the 
first one in the plugin parameters as default.

Script calls:

• $gameActors.actor(ID).paramsHistory(classId) - Returns an array with the 
value of each parameter at each actor's level.

• $gameActors.actor(ID).cparamsHistory(classId) - Returns an array with the 
value of each parameter at each actor's level.

• $gameActors.actor(ID).lastParamsGain() - Returns an array with the last 
values ​​received by the actor when leveling up. Use "CParam" for custom 
parameters.

• $gameActors.actor(ID).lastCParamsGain() - The same as above, but for
custom parameters.

• $gameActors.actor(ID).paramBase(paramId) - 
Returns the current value of the informed parameter.

• $gameActors.actor(ID).cparamBase(paramId) - 
Returns the current value of the informed custom parameter.

For the script calls below, the arguments can be understood like that:
• paramId - Replace with a param id.
• isCustom - Set to true, if you want to check for custom parameters.
(default is false)
• classId - The class id to check(default is the current class)

• $gameActors.actor(ID).initialParamCurve(paramId, isCustom, classId) - 
Returns the initial value of the given parameter. 

• $gameActors.actor(ID).minParamCurve(paramId, isCustom, classId) - 
Returns the minimum value of the given parameter curve.

• $gameActors.actor(ID).maxParamCurve(paramId, isCustom, classId) - 
Returns the maximum value of the given parameter curve.

• $gameActors.actor(ID).capParamCurve(paramId, isCustom, classId) - 
Returns the maximum value that a class parameter can have.

• $gameActors.actor(ID).paramGrowthChance(paramId, isCustom, classId) - 
Return the growth chance for this parameter.

============================================================================
Update Log
============================================================================

https://tinyurl.com/classCurves

============================================================================

@param levelZero
@text Minimum stats for all classes
@type struct<stNormalParamList>
@desc The minimum normal stats for all classes at level 0.
@default {"mhp":"1","mmp":"0","atk":"1","def":"1","mat":"1","mdf":"1","agi":"1","luk":"1"}

@param levelZeroCustom
@text Minimum custom stats for all classes
@type struct<stCustomParamList>[]
@desc The minimum custom stats for all classes at level 0.
Only works with Eli Custom Parameters.
@default ["{\"name\":\"Charisma (crm)\",\"value\":\"1\"}","{\"name\":\"Perception (per)\",\"value\":\"1\"}","{\"name\":\"Wisdom (wis)\",\"value\":\"1\"}","{\"name\":\"Reputation (rep)\",\"value\":\"1\"}"]

@param preset
@text Preset class curve
@type struct<stpreset>[]
@desc Here you can build your custom parameter curves for your classes.
@default ["{\"name\":\"Default\",\"normalParameters\":\"{\\\"mhp\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"mmp\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"atk\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"def\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"mat\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"mdf\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"agi\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"luk\\\":\\\"{\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\"}\",\"customParameters\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Perception (per)\\\\\\\",\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Charisma (crm)\\\\\\\",\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Wisdom (wis)\\\\\\\",\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Reputation (rep)\\\\\\\",\\\\\\\"growthChance\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"initial\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"min\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"max\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"cap\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"bonus\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]

*/

/* ------------------------ MINIMUM NORMAL PARAMETERS ----------------------- */
{
/*~struct~stNormalParamList:

@param mhp
@text Maximum Hp
@type text
@desc
@default 1

@param mmp
@text Maximum Mp
@type text
@desc
@default 0

@param atk
@text Atk
@type text
@desc
@default 1

@param def
@text Def
@type text
@desc
@default 1

@param mat
@text Magic Atk
@type text
@desc
@default 1

@param mdf
@text Magic Def
@type text
@desc
@default 1

@param agi
@text Agility
@type text
@desc
@default 1

@param luk
@text Luck
@type text
@desc
@default 1

*/
}

/* ------------------------ MINIMUM CUSTOM PARAMETERS ----------------------- */
{

/*~struct~stCustomParamList:

@param name
@text Custom Parameter Name
@type text
@desc This parameter is for visual purposes only. 
It does nothing inside the code.
@default

@param value
@text Value
@type text
@desc
@default 0

*/

}

/* --------------------------------- PRESETS -------------------------------- */
{
/*~struct~stpreset:

@param name
@text Name
@type text
@desc The name for reference in the class's note field.
@default NewClassCurve

@param normalParameters
@text Normal Parameters
@type struct<normalParametersSt>
@desc Build the curves for regular parameters: Atk, Def, Hp, etc.
@default {"mhp":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","mmp":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","atk":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","def":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","mat":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","mdf":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","agi":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","luk":"{\"growthChance\":\"100\",\"initial\":\"\\\"10\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}"}

@param customParameters
@text Custom
@type struct<customCurveSt>[]
@desc Only works with Eli Custom Parameters.
Set the curve for each custom parameter.
@default ["{\"name\":\"Perception (per)\",\"growthChance\":\"100\",\"initial\":\"\\\"7\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","{\"name\":\"Charisma (crm)\",\"growthChance\":\"100\",\"initial\":\"\\\"7\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","{\"name\":\"Wisdom (wis)\",\"growthChance\":\"100\",\"initial\":\"\\\"7\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}","{\"name\":\"Reputation (rep)\",\"growthChance\":\"100\",\"initial\":\"\\\"7\\\"\",\"min\":\"\\\"0\\\"\",\"max\":\"\\\"5\\\"\",\"cap\":\"\\\"30\\\"\",\"bonus\":\"\\\"0\\\"\"}"]

*/
}

/* ---------------------------- NORMAL PARAMETERS --------------------------- */
{
/*~struct~normalParametersSt:

@param mhp
@text Maximum Hp
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param mmp
@text Maximum Mp
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param atk
@text Atk
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param def
@text Def
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param mat
@text Magic Atk
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param mdf
@text Magic Def
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param agi
@text Agility
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

@param luk
@text Luck
@type struct<defaultCurveSt>
@desc The curve settings for this parameter.
@default {"growthChance":"100","initial":"\"10\"","min":"\"0\"","max":"\"5\"","cap":"\"30\"","bonus":"\"0\""}

*/
}

/* ------------------------------ X PARAMETERS ------------------------------ */
{
/*~struct~xparametersSt:

@param hit
@text Hit rate
@type note
@desc Can use number or formulas.
@default 0

@param eva
@text Evasion
@type note
@desc Can use number or formulas.
@default 0

@param cri
@text Critical rate
@type note
@desc Can use number or formulas.
@default 0

@param cev
@text Critical evasion rate
@type note
@desc Can use number or formulas.
@default 0

@param mev
@text Magic evasion rate
@type note
@desc Can use number or formulas.
@default 0

@param mrf
@text Magic reflection rate
@type note
@desc Can use number or formulas.
@default 0

@param cnt
@text Counter attack rate
@type note
@desc Can use number or formulas.
@default 0

@param hrg
@text Hp regeneration rate
@type note
@desc Can use number or formulas.
@default 0

@param mrg
@text Mp regeneration rate
@type note
@desc Can use number or formulas.
@default 0

@param trg
@text Tp regeneration rate
@type note
@desc Can use number or formulas.
@default 0

*/

}

/* ------------------------------ S PARAMETERS ------------------------------ */
{
/*~struct~sparametersSt:

@param tgr
@text Target rate
@type note
@desc Can use number or formulas.
@default 0

@param grd
@text Guard effect rate
@type note
@desc Can use number or formulas.
@default 0

@param rec
@text Recovery effect rate
@type note
@desc Can use number or formulas.
@default 0

@param pha
@text Pharmacology
@type note
@desc Can use number or formulas.
@default 0

@param mcr
@text Mp Cost Rate
@type note
@desc Can use number or formulas.
@default 0

@param tcr
@text Tp Charge Rate
@type note
@desc Can use number or formulas.
@default 0

@param pdr
@text Physical Damage Rate
@type note
@desc Can use number or formulas.
@default 0

@param mdr
@text Magic Damage Rate
@type note
@desc Can use number or formulas.
@default 0

@param fdr
@text Floor Damage Rate
@type note
@desc Can use number or formulas.
@default 0

@param exr
@text Experience Rate
@type note
@desc Can use number or formulas.
@default 0

*/

}

/* -------------------- DEFAULT PARAMETER CURVE SETTINGS -------------------- */
{
/*~struct~defaultCurveSt:

@param growthChance
@text Growth chance
@type text
@desc The chance that the actor will have to raise this parameter when level up. From 0 to 100.
@default 100

@param initial
@text Initial
@type note
@desc The initial value of this parameter.
@default 10

@param min
@text Min
@type note
@desc The minimum value that a parameter can raise when level up.
@default 0

@param max
@text Max
@type note
@desc The maximum value that a parameter can raise when level up.
@default 5

@param cap
@text Limit
@type note
@desc The higher value that a class can have for this parameter.
@default 30

@param bonus
@text Promotion Bonus
@type note
@desc Only works with Eli Class Promotion.
The value applied to an actor when he promote to this class.
@default 0

*/
}

/* --------------------- CUSTOM PARAMETER CURVE SETTINGS -------------------- */
{
/*~struct~customCurveSt:

@param name
@text Custom Parameter Name
@type text
@desc This parameter is for visual purposes only. 
It does nothing inside the code.
@default

@param growthChance
@text Growth chance
@type text
@desc The chance that the actor will have to raise this parameter when level up. From 0 to 100.
@default 100

@param initial
@text Initial
@type note
@desc The initial value of this parameter.
@default 10

@param min
@text Min
@type note
@desc The minimum value that a parameter can raise when level up.
@default 0

@param max
@text Max
@type note
@desc The maximum value that a parameter can raise when level up.
@default 5

@param cap
@text Limit
@type note
@desc The higher value that a class can have for this parameter.
@default 30

@param bonus
@text Promotion Bonus
@type note
@desc Only works with Eli Class Promotion.
The value applied to an actor when he promote to this class.
@default 0

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_ClassCurves = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.ClassCurves = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/eli-class-curve-for-rpg-maker",
    parameters: {
        levelZero: {mhp: 0, mmp: 0, atk: 0, def: 0, mat: 0, mdf: 0, agi: 0, luk: 0},
        levelZeroCustom: [{name: '', value: 0}],
        preset: [{
            name: '',
            normalParameters: {
                mhp: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
                mmp: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
                atk: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
                def: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
                mat: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
                mdf: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
                agi: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
                luk: {growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}, 
            },
            customParameters: [{name: '', growthChance: 0, initial: 0, min: 0, max: 0, cap: 0, bonus: 0}],
        }]
    },
    alias: {},
    paramsCurve: {},
    cparamsCurve: {},
    maxGrowthChance: 100,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
        this.formatLevelZeroParameters()
        this.generateCurves()
    },

    initParameters(){
        this.parameters = Eli.PluginManager.createParameters()
    },

    initPluginCommands(){},

    formatLevelZeroParameters(){
        const param = this.parameters
        param.levelZero = Object.values(param.levelZero)
        param.levelZeroCustom = param.levelZeroCustom.map(item => item.value)
    },

    param(){
        return this.parameters
    },

    generateCurves(){
        const presets = this.parameters.preset
        
        for(let i = 0, l = presets.length; i < l; i++){
            const curve = presets[i]
            const curveName = Eli.String.removeSpaces(curve.name)
            const normalParameters = curve.normalParameters
            const customParameters = curve.customParameters

            this.paramsCurve[curveName] = Object.values(normalParameters)
            this.cparamsCurve[curveName] = customParameters
        }
    },

    getClassCurve(classId, isCustom){
        if(classId > 0){
            const dataClass = $dataClasses[classId]
            const name = dataClass.meta.CustomCurve

            if(name){
                return this.getCurve(Eli.String.removeSpaces(name), isCustom)
            }else{
                return this.getDefaultCurve(isCustom)
            }
            
        }else{
            return this.getDefaultCurve(isCustom)
        }
        
    },

    getDefaultCurveName(){
        return this.parameters.preset[0].name
    },

    getDefaultCurve(isCustom){
        if(isCustom){
            return this.cparamsCurve[this.getDefaultCurveName()]
        }else{
            return this.paramsCurve[this.getDefaultCurveName()]
        }
    },

    getCurve(name, isCustom){
        if(isCustom){
            return this.cparamsCurve[name]
        }else{
            return this.paramsCurve[name]
        }
    },

    makeNewClassHistory(){
        const history = {
            params: new Array(8),
            level: 0,
        }

        return history
    },

    fillLevelZero(history){
        for(let i = 0, l = history.params.length; i < l; i++){
            const id = i
            history.params[id] = new Array(100).fill(0)
            history.params[id][0] = this.parameters.levelZero[id]
        }

        if(Imported.Eli_CustomParameter){
            const length = Eli.CustomParameter.cParamsLength()
            history.cparams = new Array(length)

            for(let i = 0, l = history.cparams.length; i < l; i++){
                const id = i
                history.cparams[id] = new Array(100).fill(0)
                history.cparams[id][0] = this.parameters.levelZeroCustom[id]
            }
        }
    },

    getNewClassHistory(){
        const history = this.makeNewClassHistory()

        this.fillLevelZero(history)

        return history
    },

}

const Plugin = Eli.ClassCurves
const Alias = Eli.ClassCurves.alias

Plugin.initialize()

const PARAMS = {
    mhp: 0, mmp: 1, atk: 2, def: 3, mat: 4, mdf: 5, agi: 6, luk: 7
}

/* ------------------------------- DATA MANAGER ------------------------------ */
{

Alias.DataManager_extractMetadata = DataManager.extractMetadata
DataManager.extractMetadata = function(data) {
    Alias.DataManager_extractMetadata.call(this, data)
    if(data){
        this.addGrowthChanceEffect(data)
        this.addGrowthChanceValue(data)
    }
}

DataManager.addGrowthChanceEffect = function(data){
    const isItemOrSkill = Eli.Utils.isDataItem(data) || Eli.Utils.isDataSkills(data)
    if(isItemOrSkill){

        if(data.meta.GrowthChanceParam){
            this.addGrowChanceEffectParam(data)
        }

        if(data.meta.GrowthChanceCParam){
            this.addGrowChanceEffectCParam(data)
        }
    }
}

DataManager.addGrowChanceEffectParam = function(data){
    Eli.String.removeSpaces(data.meta.GrowthChanceParam).toLowerCase().split(",").forEach(item => {
        let [paramId, value] = item.split(":")
        paramId = isNaN(paramId) ? PARAMS[paramId] : Number(paramId)
        const effect = {code: "Growth Chance Param", dataId: paramId, value1: Number(value), value2: 0}
        
        data.effects.push(effect)
    })
}

DataManager.addGrowChanceEffectCParam = function(data){
    Eli.String.removeSpaces(data.meta.GrowthChanceCParam).toLowerCase().split(",").forEach(item => {
        let [cparamId, value] = item.split(":")
        cparamId = Eli.CustomParameter.findCParamId(cparamId)
        const effect = {code: "Growth Chance Custom Param", dataId: cparamId, value1: Number(value), value2: 0}
        
        data.effects.push(effect)
    })
}

DataManager.createGrowthChanceForDataObject = function(data){
    data.growthChanceParam = [0, 0, 0, 0, 0, 0, 0, 0]

    if(Imported.Eli_CustomParameter){
        data.growthChanceCParam = new Array(Eli.CustomParameter.cParamsLength()).fill(0)
    }
}

DataManager.addGrowthChanceValue = function(data){
    const isValidData = Eli.Utils.isDataWeapon(data) || Eli.Utils.isDataArmor(data) || Eli.Utils.isDataStates(data)
    if(isValidData){
        this.createGrowthChanceForDataObject(data)

        if(data.meta.GrowthChanceParam){
            this.addGrowChanceValueParam(data)
        }

        if(data.meta.GrowthChanceCParam){
            this.addGrowChanceValueCParam(data)
        }
    }
}

DataManager.addGrowChanceValueParam = function(data){
    Eli.String.removeSpaces(data.meta.GrowthChanceParam).toLowerCase().split(",").forEach(item => {
        let [paramId, value] = item.split(":")
        paramId = isNaN(paramId) ? PARAMS[paramId] : Number(paramId)
        
        data.growthChanceParam[paramId] = Number(value)
    })
}

DataManager.addGrowChanceValueCParam = function(data){
    Eli.String.removeSpaces(data.meta.GrowthChanceCParam).toLowerCase().split(",").forEach(item => {
        let [cparamId, value] = item.split(":")
        cparamId = Eli.CustomParameter.findCParamId(cparamId)

        data.growthChanceCParam[cparamId] = Number(value)
    })
}

}

/* ---------------------------- GAME BATTLER BASE --------------------------- */
{

Alias.Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers
Game_BattlerBase.prototype.initMembers = function() {
    Alias.Game_BattlerBase_initMembers.call(this)
    this.clearGrowthChanceParamPlus()
    if(Imported.Eli_CustomParameter){
        this.clearGrowthChanceCParamPlus()
    }
}

Game_BattlerBase.prototype.clearGrowthChanceParamPlus = function() {
    this.growthChanceParamPlus = [0, 0, 0, 0, 0, 0, 0, 0]
}

Game_BattlerBase.prototype.clearGrowthChanceCParamPlus = function() {
    this.growthChanceCParamPlus = new Array(Eli.CustomParameter.cParamsLength()).fill(0)
}

Game_BattlerBase.prototype.getGrowthChanceParamPlus = function(paramId) {
    const battlerChance = this.growthChanceParamPlus[paramId]
    const stateChance = this.states().reduce((accumulator, state) => {
        return state ? state.growthChanceParam[paramId] + accumulator : accumulator
    }, 0)

    return battlerChance + stateChance
}

Game_BattlerBase.prototype.getGrowthChanceCParamPlus = function(paramId) {
    const battlerChance = this.growthChanceCParamPlus[paramId]
    const stateChance = this.states().reduce((accumulator, state) => {
        return state ? state.growthChanceCParam[paramId] + accumulator : accumulator
    }, 0)

    return battlerChance + stateChance
}

Game_BattlerBase.prototype.addGrowthChanceParamPlus = function(paramId, value) {
    this.growthChanceParamPlus[paramId] = this.growthChanceParamPlus[paramId] + value
}

Game_BattlerBase.prototype.addGrowthChanceCParamPlus = function(paramId, value) {
    this.growthChanceCParamPlus[paramId] = this.growthChanceCParamPlus[paramId] + value
}

}

/* ------------------------------ GAME BATTLER ------------------------------ */
{

Alias.Game_Battler_initMembers = Game_Battler.prototype.initMembers
Game_Battler.prototype.initMembers = function(){
    Alias.Game_Battler_initMembers.call(this)
    this.hasFilledHoldLevels = false
    this._classHistory = {}
}

Game_Battler.prototype.paramMin = function(id, isCustom) {
    if(isCustom){
        return Plugin.param().levelZeroCustom[id]
    }else{
        return Plugin.param().levelZero[id]
    }
}

Game_Battler.prototype.subject = function(){
    // To be overwrited by Actor and Enemy
}

Game_Battler.prototype.canInitNewClassHistory = function(classId){
    return !this._classHistory.hasOwnProperty(classId)
}

Game_Battler.prototype.initParamHistory = function(classId = this._classId){
    const history = Plugin.getNewClassHistory(classId)

    this._lastParamsGain = new Array(8).fill(0)

    if(Imported.Eli_CustomParameter){
        const length = history.cparams.length
        this._lastCParamsGain = new Array(length).fill(0)
    }

    this._classHistory[classId] = history
}

Game_Battler.prototype.buildNewClassHistory = function(classId, targetLevel){
    if(this.canInitNewClassHistory(classId)){
        this.initParamHistory(classId)
        this.fillFirstLevelHistory(false, classId)
        
        if(Imported.Eli_CustomParameter){
            this.fillFirstLevelHistory(true, classId)
        }
    }


    for(let i = 2; i <= targetLevel; i++){
        this.levelUpHistory(classId, i)
    }
    
    if(Imported.Eli_CustomParameter){

        for(let i = 2; i <= targetLevel; i++){
            this.levelUpHistory(classId, i)
        }
    }
}

Game_Battler.prototype.holdInitialCurve = function(){
    if(this.canHoldInitialCurve() && !this.hasFilledHoldLevels){
        this.fillHistoryWithInitialCurve()
    }
}

Game_Battler.prototype.fillFirstLevelHistory = function(isCustom, classId){
    const history = this.getHistoryByType(isCustom, classId)
    
    for(let i = 0; i < history.length; i++){
        const id = i     
        const initialParam = this.initialParamCurve(id, isCustom, classId)
        const level = 1

        history[id][level] = initialParam
    }

    this._classHistory[classId].level = 1
}

Game_Battler.prototype.canHoldInitialCurve = function(){
    return this.subject().meta.hasOwnProperty('HoldCurve')
}

Game_Battler.prototype.getHoldCurveLevel = function(){
    const holdCurve = this.subject().meta.HoldCurve

    return Number(holdCurve)
}

Game_Battler.prototype.fillHistoryWithInitialCurve = function(classId){
    const levelToHold = this.getHoldCurveLevel()
    const stopFill = levelToHold + 1
    const startFill = (history) => {
        for(let i = 0, l = history.length; i < l; i++){
            const parameter = history[i]
            const value = parameter[1]
    
            parameter.fill(value, 2, stopFill)
        }
    }

    startFill(this.paramsHistory(classId))

    if(Imported.Eli_CustomParameter){
        startFill(this.cparamsHistory(classId))
    }

    this._level = levelToHold
    this.hasFilledHoldLevels = true
}

Game_Battler.prototype.setHistoryLevel = function(level, isCustom, classId){
    const isLevelUp = level > this._classHistory[classId].level
    const history = this.getHistoryByType(isCustom, classId)

    for(let i = 0; i < history.length; i++){
        const id = i
        const curveValue = this.getParamValueFromCustomCurve(id, isCustom, classId);
        const paramValue = this.setParamValueWithCustomCurve(history, id, isCustom, level, curveValue, classId)

        this.fillHistory(history, isCustom, level, id, curveValue, paramValue, isLevelUp)
    }
}

Game_Battler.prototype.levelUpHistory = function(classId, targetLevel){
    if(targetLevel <= this._classHistory[classId].level) return

    let isCustom = false
    this.setHistoryLevel(targetLevel, isCustom, classId)

    if(Imported.Eli_CustomParameter){
        isCustom = true
        this.setHistoryLevel(targetLevel, isCustom, classId)
    }
    this._classHistory[classId].level++
}

Game_Battler.prototype.levelDownHistory = function(classId, targetLevel){
    if(targetLevel >= this._classHistory[classId].level) return

    let isCustom = false
    this.setHistoryLevel(targetLevel, isCustom, classId)

    if(Imported.Eli_CustomParameter){
        isCustom = true
        this.setHistoryLevel(targetLevel, isCustom, classId)
    }
    this._classHistory[classId].level--
}

Game_Battler.prototype.hasParamGrowthChance = function(id, isCustom, classId){
    const failChance = Math.randomInt(101)
    const growthChance = this.paramGrowthChance(id, isCustom, classId)
    const hasChance = growthChance >= failChance
    
    return hasChance
}

Game_Battler.prototype.getParamValueFromCustomCurve = function(id, isCustom, classId){
    if(this.hasParamGrowthChance(id, isCustom, classId)){
        return this.generateParamValueFromCurve(id, isCustom, classId)
    }else{
        return 0
    }
}

Game_Battler.prototype.generateParamValueFromCurve = function(id, isCustom, classId){
    const minCurve = this.minParamCurve(id, isCustom, classId)
    const maxCurve = this.maxParamCurve(id, isCustom, classId)
    const curveValue = Math.randomInt(maxCurve + 1)

    return Math.max(minCurve, curveValue)
}

Game_Battler.prototype.setParamValueWithCustomCurve = function(history, id, isCustom, level, curveValue, classId){
    const capCurve = this.capParamCurve(id, isCustom, classId)
    const newParamValue = history[id][level-1] + curveValue

    return Math.min(capCurve, newParamValue)
}

Game_Battler.prototype.setLastParamsGain = function(paramId, isCustom, value, paramValue, classId){
    const capValue = this.capParamCurve(paramId, isCustom, classId)

    if(paramValue + value >= capValue){
        const lastParam = (paramValue + value) - capValue
        this._lastParamsGain[paramId] = lastParam
    }else{
        if(isCustom){
            this._lastCParamsGain[paramId] = value
        }else{
            this._lastParamsGain[paramId] = value
        }
    }
}

Game_Battler.prototype.fillHistory = function(history, isCustom, level, paramId, curveValue, paramValue, isLevelUp){
    if(isLevelUp){
        history[paramId][level] = paramValue
        this.setLastParamsGain(paramId, isCustom, curveValue, paramValue)
        
    }else{
        history[paramId][level + 1] = 0
        this.setLastParamsGain(paramId, isCustom, 0, paramValue)
    }
}

Game_Battler.prototype.getHistoryByType = function(isCustom, classId){
    if(isCustom){
        return this._classHistory[classId].cparams
    }else{
        return this._classHistory[classId].params
    }
}

Game_Battler.prototype.paramGrowthChance = function(id, isCustom, classId = this._classId){
    const curve = Plugin.getClassCurve(classId, isCustom)
    const classChance = curve[id]['growthChance']
    const battlerChance = isCustom ? this.getGrowthChanceCParamPlus(id) : this.getGrowthChanceParamPlus(id)

    return (classChance + battlerChance).clamp(0, Plugin.maxGrowthChance)
}

Game_Battler.prototype.initialParamCurve = function(id, isCustom, classId = this._classId){
    const curve = Plugin.getClassCurve(classId, isCustom)
    const param = curve[id]['initial']

    return this.evaluateParameter(param)
}

Game_Battler.prototype.minParamCurve = function(id, isCustom, classId = this._classId){
    const curve = Plugin.getClassCurve(classId, isCustom)
    const param = curve[id]['min']

    return this.evaluateParameter(param)
}

Game_Battler.prototype.maxParamCurve = function(id, isCustom, classId = this._classId){
    const curve = Plugin.getClassCurve(classId, isCustom)
    const param = curve[id]['max']

    return this.evaluateParameter(param);
}

Game_Battler.prototype.capParamCurve = function(id, isCustom, classId = this._classId){
    const curve = Plugin.getClassCurve(classId, isCustom)
    const param = curve[id]['cap']

    return this.evaluateParameter(param)
}

Game_Battler.prototype.evaluateParameter = function(param){
    if(isNaN(param)){
        return eval(param)
    }else{
        return Number(param)
    }
}

Game_Battler.prototype.paramsHistory = function(classId = this._classId){
    return this._classHistory[classId].params
}

Game_Battler.prototype.cparamsHistory = function(classId = this._classId){
    return this._classHistory[classId].cparams
}

Game_Battler.prototype.lastParamsGain = function(){
    return this._lastParamsGain
}

Game_Battler.prototype.lastCParamsGain = function(){
    return this._lastCParamsGain
}

Game_Battler.prototype.changeEachLevel = function(level){
    const currentLevel = this._level;
    const levelDifference = Math.abs(currentLevel - level)

    if(currentLevel < level){

        for(let i = 0; i < levelDifference; i++){
            this.levelUp();
        }
    }else if(currentLevel > level){

        for(let i = 0; i < levelDifference; i++){
            this.levelDown();
        }
    }

}

Game_Battler.prototype.prepareClass = function(classId, keepExp){
    const targetLevel = keepExp ? this._level : 1
    this.buildNewClassHistory(classId, targetLevel)
}

}

/* ------------------------------- GAME ACTOR ------------------------------- */
{

Alias.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    this.setupMainClass(actorId)
    Alias.Game_Actor_setup.call(this, actorId)
    this.fillMainClass(actorId)
}

Alias.Game_Actor_param = Game_Actor.prototype.param
Game_Actor.prototype.param = function(paramId) {
    const alias = Alias.Game_Actor_param.call(this, paramId)
    const maxValue = this.capParamCurve(paramId)
    const minValue = this.paramMin(paramId)
    const value = alias.clamp(minValue, maxValue)

    return value
}

Alias.Game_Actor_cparam = Game_Actor.prototype.cparam
Game_Actor.prototype.cparam = function(paramId) {
    const alias = Alias.Game_Actor_cparam.call(this, paramId)
    const maxValue = this.capParamCurve(paramId, true)
    const minValue = this.paramMin(paramId, true)
    const value = alias.clamp(minValue, maxValue)

    return value
}

Alias.Game_Actor_levelUp = Game_Actor.prototype.levelUp
Game_Actor.prototype.levelUp = function() {
    this.levelUpHistory(this._classId, this._level + 1)
    Alias.Game_Actor_levelUp.call(this)
}

Alias.Game_Actor_levelDown = Game_Actor.prototype.levelDown
Game_Actor.prototype.levelDown = function() {
    Alias.Game_Actor_levelDown.call(this)
    this.levelDownHistory(this._classId, this._level)
}

Alias.Game_Actor_changeLevel = Game_Actor.prototype.changeLevel
Game_Actor.prototype.changeLevel = function(level, show) {
    this.changeEachLevel(level)
    Alias.Game_Actor_changeLevel.call(this, level, show)
}

Alias.Game_Actor_changeClass = Game_Actor.prototype.changeClass
Game_Actor.prototype.changeClass = function(classId, keepExp) {
    this.prepareClass(classId, keepExp)
    Alias.Game_Actor_changeClass.call(this, classId, keepExp)
}

// Overwrite, since we do not use the params from $dataClasses anymore.
Game_Actor.prototype.paramBase = function(paramId) {
    return this.paramsHistory()[paramId][this._level]
}

Game_Actor.prototype.cparamBase = function(paramId) {
    return this.cparamsHistory()[paramId][this._level]
}

Game_Actor.prototype.subject = function(){
    return this.actor()
}

Game_Actor.prototype.setupMainClass = function(actorId){
    const actor = $dataActors[actorId]
    this._classId = actor.classId

    if(this.canInitNewClassHistory(this._classId)){
        this.initParamHistory(this._classId)
        this._classHistory[this._classId].isPromoted = true
    }
}

Game_Actor.prototype.fillMainClass = function(actorId){
    this._level = 1
    this.fillFirstLevelHistory(false, this._classId)

    if(Imported.Eli_CustomParameter){
        this.fillFirstLevelHistory(true, this._classId)
    }
    this.holdInitialCurve()
    this.changeLevel($dataActors[actorId].initialLevel)
    this._classHistory[this._classId].level = $dataActors[actorId].initialLevel
    this.recoverAll()
}

Game_Actor.prototype.getGrowthChanceParamPlus = function(paramId) {
    const battlerChance = Game_BattlerBase.prototype.getGrowthChanceParamPlus.call(this, paramId)
    const equipChance = this.equips().reduce((accumulator, equip) => {
        return equip ? equip.growthChanceParam[paramId] + accumulator : accumulator
    }, 0)

    return battlerChance + equipChance
}

Game_Actor.prototype.getGrowthChanceCParamPlus = function(paramId) {
    const battlerChance = Game_BattlerBase.prototype.getGrowthChanceCParamPlus.call(this, paramId)
    const equipChance = this.equips().reduce((accumulator, equip) => {
        return equip ? equip.growthChanceCParam[paramId] + accumulator : accumulator
    }, 0)

    return battlerChance + equipChance
}

}

/* ------------------------------- GAME ENEMY ------------------------------- */
if(Imported.Eli_EnemyClass){

Alias.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    this.setupMainClass(enemyId)
    Alias.Game_Enemy_setup.call(this, enemyId, x, y)
    this.fillMainClass()
}

Alias.Game_Enemy_cparamBase = Game_Enemy.prototype.cparamBase
Game_Enemy.prototype.cparamBase = function(paramId) {
    if(this._classId > 0){
        return this.cparamsHistory()[paramId][this._level]
    }else{
        return Alias.Game_Enemy_cparamBase.call(this, paramId)
    }
}

Alias.Game_Enemy_param = Game_Enemy.prototype.param
Game_Enemy.prototype.param = function(paramId) {
    let value = Alias.Game_Enemy_param.call(this, paramId)

    if(this._classId > 0){
        const maxValue = this.capParamCurve(paramId)
        const minValue = this.paramMin(paramId)
        value = value.clamp(minValue, maxValue)
    }

    return value
}

Alias.Game_Enemy_cparam = Game_Enemy.prototype.cparam
Game_Enemy.prototype.cparam = function(paramId) {
    let value = Alias.Game_Enemy_cparam.call(this, paramId)

    if(this._classId > 0){
        const maxValue = this.capParamCurve(paramId, true)
        const minValue = this.paramMin(paramId, true)
        value = value.clamp(minValue, maxValue)
    }

    return value
}

// Alias from Enemy Class
Alias.Game_Enemy_levelUp = Game_Enemy.prototype.levelUp
Game_Enemy.prototype.levelUp = function() {
    this.levelUpHistory(this._classId, this._level + 1)
    Alias.Game_Enemy_levelUp.call(this)
}

// Alias from Enemy Class
Alias.Game_Enemy_levelDown = Game_Enemy.prototype.levelDown
Game_Enemy.prototype.levelDown = function() {
    Alias.Game_Enemy_levelDown.call(this)
    this.levelDownHistory(this._classId, this._level)
}

// Alias from Enemy Class
Alias.Game_Enemy_changeLevel = Game_Enemy.prototype.changeLevel
Game_Enemy.prototype.changeLevel = function(level, show) {
    this.changeEachLevel(level)
    Alias.Game_Enemy_changeLevel.call(this, level, show)
}

// Alias from Enemy Class
Alias.Game_Enemy_changeClass = Game_Enemy.prototype.changeClass
Game_Enemy.prototype.changeClass = function(classId, keepExp) {
    this.prepareClass(classId, keepExp)
    Alias.Game_Enemy_changeClass.call(this, classId, keepExp)
}

Game_Enemy.prototype.hasInitialLevel = function(){
    return this.enemy().meta.hasOwnProperty('InitialLevel')
}

// Overwrite from Enemy Class. We do not use the params from $dataClasses anymore.
Game_Enemy.prototype.getParamBaseFromClass = function(paramId) {
    return this.paramsHistory()[paramId][this._level]
}

Game_Enemy.prototype.subject = function(){
    return this.enemy()
}

Game_Enemy.prototype.setupMainClass = function(enemyId){
    const enemy = $dataEnemies[enemyId]
    const meta = enemy.meta
    this._classId = Number(meta.ClassId) || 0
    
    if(this._classId > 0){
        if(this.canInitNewClassHistory(this._classId)){
            this.initParamHistory(this._classId)
            this._classHistory[this._classId].isPromoted = true
        }
    }
}

Game_Enemy.prototype.fillMainClass = function(){
    if(this._classId > 0){
        this.fillFirstLevelHistory(false, this._classId)

        if(Imported.Eli_CustomParameter){
            this.fillFirstLevelHistory(true, this._classId)
        }

        this.holdInitialCurve()
        this.changeLevel(this._initialLevel)
        this._classHistory[this._classId].level = this._initialLevel
    }

    this.recoverAll()
}

Game_Enemy.prototype.getGrowthChanceParamPlus = function(paramId) {
    const battlerChance = Game_BattlerBase.prototype.getGrowthChanceParamPlus.call(this, paramId)
    const equipChance = this.equips().reduce((accumulator, equip) => {
        return equip ? equip.growthChanceParam[paramId] + accumulator : accumulator
    }, 0)

    return battlerChance + equipChance
}

Game_Enemy.prototype.getGrowthChanceCParamPlus = function(paramId) {
    const battlerChance = Game_BattlerBase.prototype.getGrowthChanceCParamPlus.call(this, paramId)
    const equipChance = this.equips().reduce((accumulator, equip) => {
        return equip ? equip.growthChanceCParam[paramId] + accumulator : accumulator
    }, 0)

    return battlerChance + equipChance
}

}

/* ------------------------------- GAME ACTION ------------------------------ */
{

Game_Action.EFFECT_GROWTH_CHANCE_PARAM            = "Growth Chance Param"
Game_Action.EFFECT_GROWTH_CHANCE_CPARAM           = "Growth Chance Custom Param"

Alias.Game_Action_applyItemEffect = Game_Action.prototype.applyItemEffect
Game_Action.prototype.applyItemEffect = function(target, effect) {
    Alias.Game_Action_applyItemEffect.call(this, target, effect)
    this.applyItemEffectGrowthChance(target, effect)
}

Game_Action.prototype.applyItemEffectGrowthChance = function(target, effect) {
    switch (effect.code) {
        case Game_Action.EFFECT_GROWTH_CHANCE_PARAM:
            this.itemEffectGrowChanceParam(target, effect)
        break
        case Game_Action.EFFECT_GROWTH_CHANCE_CPARAM:
            this.itemEffectGrowChanceCParam(target, effect)
        break
    }
}

Game_Action.prototype.itemEffectGrowChanceParam = function(target, effect) {
    target.addGrowthChanceParamPlus(effect.dataId, Math.floor(effect.value1))
    this.makeSuccess(target)
}

Game_Action.prototype.itemEffectGrowChanceCParam = function(target, effect) {
    target.addGrowthChanceCParamPlus(effect.dataId, Math.floor(effect.value1))
    this.makeSuccess(target)
}

}

}