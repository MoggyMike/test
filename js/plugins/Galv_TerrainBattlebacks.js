//-----------------------------------------------------------------------------
//  Galv's Terrain Battlebacks
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  Galv_TerrainBattlebacks.js
//-----------------------------------------------------------------------------
//  2017-12-01 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_TerrainBattlebacks = true;

var Galv = Galv || {};        // Galv's main object
Galv.TBB = Galv.TBB || {};        // Galv's plugin stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.0) Specify which battlebacks appear when a battle is started depending on what terrain tag (or region) the player is standing on
 *
 * @author Galv - galvs-scripts.com
 *
 * @param Terrain Tag 1 Battlebacks
 * @desc Battlebacks used when battling on that terrain tag.
 * battleback1,battleback2
 * @default
 *
 * @param Terrain Tag 2 Battlebacks
 * @desc Battlebacks used when battling on that terrain tag.
 * battleback1,battleback2
 * @default
 *
 * @param Terrain Tag 3 Battlebacks
 * @desc Battlebacks used when battling on that terrain tag.
 * battleback1,battleback2
 * @default
 *
 * @param Terrain Tag 4 Battlebacks
 * @desc Battlebacks used when battling on that terrain tag.
 * battleback1,battleback2
 * @default
 *
 * @param Terrain Tag 5 Battlebacks
 * @desc Battlebacks used when battling on that terrain tag.
 * battleback1,battleback2
 * @default
 *
 * @param Terrain Tag 6 Battlebacks
 * @desc Battlebacks used when battling on that terrain tag.
 * battleback1,battleback2
 * @default
 *
 * @param Terrain Tag 7 Battlebacks
 * @desc Battlebacks used when battling on that terrain tag.
 * battleback1,battleback2
 * @default
 *
 * @param Region Battlebacks
 * @desc More advanced setup for region id's. See help doc.
 * id,battleback1,battleback2|id,battleback1,battleback2
 * @default
 *
 * @help
 *   Galv's Terrain Battlebacks
 * ----------------------------------------------------------------------------
 * This plugin allows you to specify which battlebacks appear when a battle
 * is started depending on what terrain tag the player is standing on.
 *
 * By default, RPG Maker MV automatically selects battlebacks on the overworld
 * map depending on the tile you are on. This plugin keeps that functionality
 * but settings you choose will take priority over that.
 * In addition to the plugin settings, you can also use map notes to specify
 * what terrain and region battlebacks are for individual maps.
 *
 * MAP NOTES
 *
 *     <rbacks x:battleback1,battleback2>   // x = region id to overwrite
 *
 *     <tbacks x:battleback1,battleback2>   // x = terrain tag to overwrite
 *
 *
 * NOTE: The chosen battleback will be determined by numerous factors in your
 * game. Here's a list of the priority it uses to determine which battleback
 * is used at the time.
 *
 *
 * PRIORTY OF BATTLEBACK SELECTION
 * 1. Map setting 'Specify Battle Back'
 * 2. Event command 'Change Battle Back'
 * 3. Region id map notes
 * 4. Region id plugin settings
 * 5. Terrain tag map notes ~~
 * 6. Terrain tag plugin settings ~~
 * 7. Default RPG Maker auto battle back selection based on tile ~~
 * 8. No battle backs at all.
 *
 * ~~ Note: RPG Maker seems to assign terrain tags to A tiles, even though you
 * set them to 0 in the database. Be aware that this means that even though
 * you set them to 0, they might still be a different number and be looking at
 * your terrain tag settings to find the battlebacks relating to whatever
 * that tag number is.
 * ----------------------------------------------------------------------------
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

Galv.TBB.battlebacks = {};  // for terrain tag battleback list
Galv.TBB.rbattlebacks = {}; // for region id battleback list

Galv.TBB.regionsObject = function(string) {
	if (!string) return {};

	var obj = {};
	txt = string.split('|');
	for (var i = 0; i < txt.length; i++) {
		var a = txt[i].split(',');
		obj[Number(a[0])] = [a[1],a[2]];
	}
	return obj;
};

var p = PluginManager.parameters('Galv_TerrainBattlebacks');

// terrain tag setup
for (var i = 1; i < 8; i++) {
	var data = p["Terrain Tag " + i + " Battlebacks"];
	if (data) Galv.TBB.battlebacks[i] = data.split(',');
};
// region id setup
Galv.TBB.rbattlebacks = Galv.TBB.regionsObject(p["Region Battlebacks"]);


//-----------------------------------------------------------------------------
//  SPRITESET BATTLE
//-----------------------------------------------------------------------------

Galv.TBB.Spriteset_Battle_battleback1Name = Spriteset_Battle.prototype.battleback1Name;
Spriteset_Battle.prototype.battleback1Name = function() {	
	return this.specifiedBattlebackName(0) || Galv.TBB.Spriteset_Battle_battleback1Name.call(this);
};

Galv.TBB.Spriteset_Battle_battleback2Name = Spriteset_Battle.prototype.battleback2Name;
Spriteset_Battle.prototype.battleback2Name = function() {	
	return this.specifiedBattlebackName(1) || Galv.TBB.Spriteset_Battle_battleback2Name.call(this);
};

Spriteset_Battle.prototype.specifiedBattlebackName = function(id) {
	if (!$dataMap.specifyBattleback) {		
		if (!$gameMap.battleback1Name()) {
			// REGION
			var region = $gamePlayer.regionId();
			if ($dataMap.meta['rbacks ' + region]) return $dataMap.meta['rbacks ' + region].split(',')[id];  // check for map note
			if (Galv.TBB.rbattlebacks[region]) return Galv.TBB.rbattlebacks[region][id];  // check for plugin setting
		}
		
		if (!$gameMap.battleback2Name()) {
			// TERRAIN
			var terrain = $gamePlayer.terrainTag();	
			if ($dataMap.meta['tbacks ' + terrain]) return $dataMap.meta['tbacks ' + terrain].split(',')[id];  // check for map note
			if (Galv.TBB.battlebacks[terrain]) return Galv.TBB.battlebacks[terrain][id]; // check for plugin setting
		}
	};
	// NEITHER - GO TO NORMAL FUNCTIONALITY
	return '';
};

})();