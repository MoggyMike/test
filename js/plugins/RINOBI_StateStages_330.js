module RINOBI module StateStages # DO NOT MODIFY
#==============================================================================
#
#                                State Stages
#
#::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
#
# By: Rinobi
# -----------------------------------------------------------------------------
# A unique approach to progressive state effects. This script is intended for
# those who wish to have incremental state fuctionality. These states are
# affected by the application of related states. Applying a state that increses
# a stat can have its power increased by applying that state again, or reduced
# by applying an opposite state. Of course, how states interact within your
# project is entirely up to you.
#-
# This script comes into play when states are applyed to a battler in combat 
# and is intended to function with any battle system that does not deviate too
# far from the way states are applied to battlers.
#-
# Another use of this script is the separation of positive and negative status
# effects. Allowing for skills or items that 'remove all negative status' for
# example, with a simple script call.
#==============================================================================
# # VERSION HISTORY
# -----------------------------------------------------------------------------
# 1.0 [04/29/2016] Completed
# 2.0 [05/11/2016] Bug fixes, Removal methods added, User Friendly Update
# 2.1 [06/30/2016] State removal no long displayed upon staging.
# 3.0 [07/27/2016] Notetaging System. Visual Information.
# 3.2 [07/29/2016] Added new notetag for adjusting state notes.
# 3.3 [08/14/2016] Included Multi-Staging for all features.
#-
# Details listed under 'Updates' section at the bottom of this page.
#==============================================================================
# # INSTRUCTIONS
# -----------------------------------------------------------------------------
# This script is not plug & play. Please read the instructions carefully.
#-
# There are two ways to setup state staging with version 3.0. You may use the
# the new notetags or simply continue to using staging hash witin the Settings
# below. The principal is same eiter way, and both can be used together.
#===================================================
# >> Understanding Staging
# --------------------------------------------------
# A state stage is a number of states organized
# from least to greatest in terms of effect. Let's
# say we have a 3-stage state which increases ATK.
#-
# State ID 20 Increases ATK by 25%
# State ID 19 Increases ATK by 50%
# State ID 25 Increases ATK by 100%
#-
# These three states will be used to create a
# staging state. To set this up within staging hash,
# we need to assign this stage a name and organize
# them within an array.
#-
# :ATK => {:pos => [20, 19, 25]}, #<= Include Comma
#-
# We use 'pos' here because increasing the ATK state
# is a positive effect. When state 20 is added to a 
# battler, the state is added as it normally would be. 
# However if state 20 is added again, state 19 will be
# applied instead. If state 20 is added yet again, 
# state 25 will be applied. This is a 'single-stage'.
# 
# To create a duel stage, we simply add to our current
# stage an effect opposite of the ATK increase.
# (It can be whatever you want really.)
#-
# State ID 13 Reduces ATK by 20%
# State ID 10 Reduces ATK by 40%
# State ID 34 Reduces ATK by 80%
#- 
# Instead of creating a new staging state, we simply
# add these to an existing stage, like so:
#-
# :ATK => {:pos => [20, 19 25], :neg => [13, 10, 34]}
#-
# Now think of this as a sort of number line.
# :pos states influence :neg states and vice versa.
# Let's say a battler has state 19 for example. If
# state 13 is then applied, state 20 will be added
# instead. Basically reducing the stage by 1 instead
# of simply adding another state. If state 13 were
# added again, state 20 would simply be removed.
# Only after be added YET AGAIN, would state 13
# actually be applied to the target battler.
# Continuing this trend, state 10 and finally state
# 34 would be added.
#-
# If a state is not seen as positive or negative, 
# use :neu, or any name such as :Bob. This will
# prevent the stage from being influenced by
# positive and negative state removal. 
# There are script calls to deal with custom names.
#===================================================
# >> Staging Notetags
# --------------------------------------------------
# These notetags are to be used witin
# the States tab of the database.
#------------------------------------------------
#  <Stage: stage_name, stage_type, index>
#------------------------------------------------
# This note tag the current state to a staging
# state. If stage does not already exist, a new
# one will be created with the chosen name.
#-
# @> stage_name is a unique name of the stage.
#    PSN for example meaning 'poison' for example.
# @> stage_type sets the type to pos, neg, or neu.
#    You may also use unique names here.
# @> index is a number represeting the stage position
#    1 sets the state ID to the first position.
#    3 sets the state ID to the third position.
#------------------------------------------------
#  <Abbr_Name: new_name>
#------------------------------------------------
# This allows the changing of the staging name
# for display purposes. It does not actually
# change the stage name, so any references to
# said name should use the original. This should
# be placed after the above notetag.
#-
# @> where value is a replacement name for the
#    current state.
#-
# Example:
# <Stage: PSN, neg, 1>
# <Abbr_Name: Venom>
#------------------------------------------------
#  <Index: index, Copy: feat1, Take: feat2>
#------------------------------------------------
# This notetag should be placed underneath the
# previous notetag. It allows features to be
# copied or taken from one state and used to 
# quickly create a new state that is then added
# to the stage. This means that a new state will
# be created using the current state as a parent.
#-
# @> Where index is the position of the new state
#    If you used: <Stage: PSN, neg, 1> for example
#    Then: <Index: 2, Copy: 0, Take: 2> would take
#    the second feature from this state and create
#    a new state with that feature.
# @> feat1 is the feature to be copied to the new
#    state. It will not affect the current state.
# @> feat2 is the feature to be taken from the
#    current state and added to the new state.
#-
# Example:
# <Stage: PSN, neg, 1>
# <Index: 2, Copy: 0, Take 2>
#------------------------------------------------
#  <Adj_State: index, key: value>
#------------------------------------------------
# This notetag allows existing states within a
# stage to be modified. By default, a state
# using the above notetag will inherit all values
# from the parent state save features. This
# should be placed beneath the above notetags.
#-
# @> index is the state's index within a stage to
#    be modified.
# @> key: is the type of infomation to be modified
#    more on this below.
# @> value is the number or text replacing the old
#    setting. This will vary depending upon the key
#-
# Example Setup:
# <Stage: PSN, neg, 1>
# <Index: 2, Copy: 0, Take: 2>
# <Adj_State: 2, name: "Bad Poison">
#---------------------------
#  List of Avaliable Keys
#---------------------------
# 1.  name:			The state's name in quotations ("")
# 2.  icon:			The icon index of the state.
# 3.  note:			The state's notetags.
# 4.  restrict:			The state's restrictions.
#					0 => None
#					1 => Attack Enemy
#					2 => Attack Enemy or Ally
#					3 => Attack Ally
#					4 => Cannot Act
# 5.  priority:			The state's priority value.
#					A Number => 0 - 100
# 6.  remove_end?:		Is state removed at the end of battle?
#					True or False / 1 or 0
# 7.  remove_restrict?:		Is state removed upon restriction?
#					True or False / 1 or 0
#					(See 'restrict:' above)
#					State is removed a value above 1
#					is applied by another state.
# 8.  remove_auto:		Whether the state is removed at the end
#				of actions or turns.
#					0 => None, state never fades.
#					1 => At End of Action
#					2 => At End of Turns
# 9.  remove_turn:		If above setting is 1 or 2, sets the number
#				of turns or actions the state is removed.
#					min_turns, max_turns
#					EX: 2, 8 (Between 2 and 8 turns)
# 10. remove_dmg?:		Can state be removed by damage?
#					A Number => 0 - 100
#					This represents the chance that
#					state will be remove upon reciving
#					damage. Set to 0 to disable.
# 11. remove_walk?:		Can state be removed by walking?
#					A Number => 0 - or above.
#					The number of steps before the
#					state is removed on the map.
#					The state's effects are applied
#					every 20 steps.
# 12. msg1:			Message when an actor fell in the state.
# 13. msg2:			Message when an enemy fell in the state.
# 14. msg3:			Message when the state remains.
# 15. msg4:			Message when the state removes.
#------------------------------------------------
#  <Adj_Note, index> value </Adj_Note>
#------------------------------------------------
# Used specifically to adjust the notes of a
# stage. Use this notetag for compatibily with
# scripts that requires state notetags.
#-
# Example Setup:
# <Stage: PSN, neg, 1>
# <Index: 2, Copy: 0, Take: 2>
# <Adj_Note, 2>
# <close effect: hp damage 12%>
# <leave effect: hp damage 12%>
# </Adj_Note>
#------------------------------------------------
#  -Complete Example-
#------------------------------------------------
# <Stage: PSN, neg, 1>
# <Abbr_Name: Venom>
# <Index: 2, Copy: 0, Take: 2>
# <Index: 3, Copy: 0, Take: 3>
# <Index: 4, Copy: 0, Take: 4>
# <Index: 5, Copy: 0, Take: 5>
# <Adj_State: 2, name: "Bad Poison">
# <Adj_State: 3, name: "Worsening Posion">
# <Adj_State: 4, name: "Severe Poisoning">
# <Adj_State: 5, name: "Fatal Poisoning">
#------------------------------------------------
#  Muti-Staging
#------------------------------------------------
# In order to keep state pupups (if you have them)
# to a minimum, as well providing a way to advance
# multiple stages at once, State Stages will
# modify any repeating instances of 'Add State'
# within a skill's 'Effects' list. In the example
# above, if you wanted to add "Worsening Poison"
# immedately, it is as simple as having three
# instances of 'Add State Poison' within the
# effects list. The state ID of "Worsening Poison"
# would be added to the target immedately. This
# modification is done upon stating your project
# and will not produce any FPS loss in battle.
#-
# As of version 3.3, multi-staging is available
# for all features. State Rate and State Resist
# are inclusive, while ATK State works the same
# as multi-staging effects.
#------------------------------------------------
#  Staging Display Options (Experimental)
#------------------------------------------------
# Designed to work in tandem with Yanfly's Battle
# System. The staging name as well as the current
# stage number can be displayed above state icons
# using the settings below. This may also work
# with other scripts which display state icons,
# but no promises!
#==============================================================================
# # Script Calls
# -----------------------------------------------------------------------------
# 1. purge_states	Removes all states managed by state stages.
#			EX: b.purge_states
# 2. neg_removal	Removes all negative states.
#			EX: a.neg_removal
# 3. pos_removal	Removes all positive states.
#			EX: b.pos_removal
# 4. neu_removal	Removes all neutral states.
#			EX: a.neu_removal
# 4. type_removal(type_key)
#			Removes all states with type_key. This is useful for
#			stages with types other than :pos, :neg, or :neu.
#			EX: b.type_removal(:neu)
# 5. state_removal(stage_key, type_key)
#			Removes all states within a specific state stage.
#			within positive, negative, neutral, or custom types.
#			EX a.state_removal(:ATK, :pos)
#==============================================================================
# # SETTINGS
# -----------------------------------------------------------------------------
# Adjust the below settings to your liking.
#-
    
    #======================================================================
    # >> Debugger
    # ---------------------------------------------------------------------
    # When true, your entire staging hash will be printed to the console
    # upon starting the game or test battle. This helps to ensure that
    # your staging hash is being setup correctly and.
    #======================================================================
      Debugger = false
      
    #======================================================================
    # >> Stage Number Settings
    # ---------------------------------------------------------------------
    # This is a number displayed above a state's icon representing the
    # current 'stage' of said state that is applied to the target. If a 
    # state only has a single stage, this number will not be displayed.
    #======================================================================
    
      #------------------------------------------------------------------
      # Enable the display of staging numbers.
      #------------------------------------------------------------------
        Show_Number_Text = true
      #------------------------------------------------------------------
      # The X position of the staging number.
      #------------------------------------------------------------------
        Number_X = 2
      #------------------------------------------------------------------
      # The Y position of the staging number.
      #------------------------------------------------------------------
        Number_Y = 8
      #------------------------------------------------------------------
      # The font size of the staging number.
      #------------------------------------------------------------------
        Number_Size = 14
      #------------------------------------------------------------------
      # Bold text display.
      #------------------------------------------------------------------
        Number_Bold = true
      #------------------------------------------------------------------
      # The text color display for neutral states.
      #------------------------------------------------------------------
        Number_Neu_Color = 0
      #------------------------------------------------------------------
      # The text color display for positive states.
      #------------------------------------------------------------------
        Number_Pos_Color = 1
      #------------------------------------------------------------------
      # The text color dispaly for negative states.
      #------------------------------------------------------------------
        Number_Neg_Color = 2
      #------------------------------------------------------------------
      # The text display for states on maximum stage.
      # Set to nil to just display the staging number.
      #------------------------------------------------------------------
        Number_Max_Text = 'max'
      
    #======================================================================
    # >> Stage Name Settings
    # ---------------------------------------------------------------------
    # This is the stage name which is displayed above a state's icon. Since
    # icons are quite small, its a good idea to only use this along side
    # abbrivated names such as 'PSN' or 'BRN'. Stage names that are too
    # long may produce visual effects.
    #======================================================================
    
      #------------------------------------------------------------------
      # Enable the display of staging names.
      #------------------------------------------------------------------
        Show_Name_Text = true
      #------------------------------------------------------------------
      # The X position of the staging name.
      #------------------------------------------------------------------
        Name_X = -4
      #------------------------------------------------------------------
      # The Y position of the staging name.
      #------------------------------------------------------------------
        Name_Y = -8
      #------------------------------------------------------------------
      # The font size of the staging name.
      #------------------------------------------------------------------
        Name_Size = 11
      #------------------------------------------------------------------
      # Bold text display.
      #------------------------------------------------------------------
        Name_Bold = true
      #------------------------------------------------------------------
      # The text color display for neutral states.
      #------------------------------------------------------------------
        Name_Neu_Color = 0
      #------------------------------------------------------------------
      # The text color display for positive states.
      #------------------------------------------------------------------
        Name_Pos_Color = 0
      #------------------------------------------------------------------
      # The text color display for negative states.
      #------------------------------------------------------------------
        Name_Neg_Color = 0
      
      
    #======================================================================
    # >> Staging States Hash
    # ---------------------------------------------------------------------
    # As of version 3.0, it is no longer required to set up state stages
    # using this hash, however, it can still be used along side notetags
    # for those upgrading from a previous version.
    #-
    # name => {:pos => [positive effect IDs], :neg => [negative effect IDs]}
    #-
    # name		  - Can be any integer, string, or symbol.
    # :pos IDs	- The positive effect IDs of the states in your database.
    # :neg IDs	- The negative effect IDs of the states in your database.
    #-
    # You may exclude :pos or :neg from the hash if you so choose.
    # You may also use :neu to indicate that the state is neither good or bad.
    #======================================================================
      States = { # V Make Adjustments Below V
        :nil => {:pos => [], :neu => [], :neg => []}, # Copy/Paste
      } # DO NOT MODIFY
      
#==============================================================================
# # COMPATIBILITY
# -----------------------------------------------------------------------------
# Created for use within RPG Maker VX Ace
#- 
# Requirements
# 1. None
#- 
# Overwrite Methods
# 1. None
#- 
# Alias Methods
# 1. DataManager  =>  load_normal_database
# 2. DataManager  =>  load_battle_test_database
# 3. SceneManager =>  first_scene_class
# 3. Game_Battler =>  add_state
# 5. Window_Base  =>  draw_actor_icons
#==============================================================================
# # TERMS OF USE
#------------------------------------------------------------------------------
# 1. Preserve this header.
# 2. Do not re-upload this script.
# 3. Do not claim this script as your own work.
# 4. Do not release modified versions of this script.
# 5. Free for use within non-commercial projects.
# 6. Free for use within commercial projects.
# 7. Credit Rinobi if used.
#==============================================================================
# # END OF SETUP
# -----------------------------------------------------------------------------
# Editing beyond this line may result in undesirable side-effects.
#==============================================================================
    
    #======================================================================
    # >> Method Module
    #======================================================================
      module Method
        #---------------------------------------------------------------
        # * Method Variables
        #---------------------------------------------------------------
        @state_hash = States
        #---------------------------------------------------------------
        # * Method: State Staging Hash
        #---------------------------------------------------------------
        def self.state_hash
          @state_hash
        end # state_hash
        #---------------------------------------------------------------
        # * Method: Adjust Skill Effects For Staging
        #---------------------------------------------------------------
        def self.adj_seffect(skill_id, state_id, indexes)
          new_effect = RPG::UsableItem::Effect.new
          new_effect.data_id = state_id
          new_effect.code = 21
          value1, value2 = 0, 0
          indexes.each do |ii, is|
            value1 += $data_skills[skill_id].effects[ii].value1
            value2 += $data_skills[skill_id].effects[ii].value2
          end # Value Storage
          new_effect.value1 = [value1 / indexes.length, 1].min.round(2)
          new_effect.value2 = [value2 / indexes.length, 1].min.round(2)
          $data_skills[skill_id].effects.push(new_effect)
        end # self.adj_seffect
        #---------------------------------------------------------------
        # * Method: Adjust Item Effects For Staging
        #---------------------------------------------------------------
        def self.adj_ieffect(item_id, state_id, indexes)
          new_effect = RPG::UsableItem::Effect.new
          new_effect.data_id = state_id
          new_effect.code = 21
          value1, value2 = 0, 0
          indexes.each do |ii, is|
            value1 += $data_items[item_id].effects[ii].value1
            value2 += $data_items[item_id].effects[ii].value2
          end # Value Storage
          new_effect.value1 = [value1 / indexes.length, 1].min.round(2)
          new_effect.value2 = [value2 / indexes.length, 1].min.round(2)
          $data_items[item_id].effects.push(new_effect)
        end # self.adj_ieffect
        #---------------------------------------------------------------
        # * Method: Adjust Item Features For Staging
        #---------------------------------------------------------------
        def self.adj_feature(id, state_id, indexes, objects, code)
          new_feature = RPG::BaseItem::Feature.new
          new_feature.data_id = state_id
          new_feature.code = code
          value = 0
          indexes.each {|ii, is| value += objects[id].features[ii].value}
          new_feature.value = [value / indexes.length, 1].min.round(2)
          objects[id].features.push(new_feature)
        end # self.adj_feature
        #---------------------------------------------------------------
        # * Method: Create New State For Staging
        #---------------------------------------------------------------
        def self.new_stage(id, index, copy, take)
          index = index.scan(/(.*)/)[0][0].split(",")
          take  = take.scan(/(.*)/ )[0][0].split(",")
          copy  = copy.scan(/(.*)/ )[0][0].split(",")
          return if index.compact.delete_if(&:empty?).empty?
          state       =  RPG::State.new
          parent      =  $data_states[id]
          unless copy.compact.delete_if(&:empty?).empty?
            copy.each do |id|
              next unless id.to_i > 0
              state.features.push(parent.features[id.to_i - 1])
            end #--
          end #----
          unless take.compact.delete_if(&:empty?).empty?
            take.each do |id| 
              next unless id.to_i > 0
              state.features.push(parent.features[id.to_i - 1])
              parent.features[id.to_i - 1] = nil
            end #--
          end #----
          state.id   = $data_states.length
          state.name = parent.name
          state.note = parent.note
          state.icon_index  = parent.icon_index
          state.restriction = parent.restriction
          state.priority    = parent.priority
          state.remove_at_battle_end  = parent.remove_at_battle_end
          state.remove_by_restriction = parent.remove_by_restriction
          state.auto_removal_timing   = parent.auto_removal_timing
          state.min_turns = parent.min_turns
          state.max_turns = parent.max_turns
          state.remove_by_damage  = parent.remove_by_damage
          state.chance_by_damage  = parent.chance_by_damage
          state.remove_by_walking = parent.remove_by_walking
          state.steps_to_remove   = parent.steps_to_remove
          state.message1, state.message2 = parent.message1, parent.message2
          state.message3, state.message4 = parent.message3, parent.message4
          state.note.gsub!(RINOBI::StateStages::Regexp::New_Stage, '')
          parent.note  =~  RINOBI::StateStages::Regexp::Add_Stage
          $data_states.push(state)
          index.each {|dex| add_stage(state.id, dex.to_i, $2.to_sym, $1.to_sym)}
        end # self.new_stage
        #---------------------------------------------------------------
        # * Method: Add New State To Staging
        #---------------------------------------------------------------
        def self.add_stage(id, index, type, stage)
          if state_hash.key?(stage)
            if state_hash[stage].key?(type)
              state_hash[stage][type][index - 1] = id
            else
              state_hash[stage][type] = Array.new
              state_hash[stage][type][index - 1] = id
            end #--
          else
            state_hash[stage] = Hash.new
            state_hash[stage][type] = Array.new
            state_hash[stage][type][index - 1] = id
          end #----
        end # self.add_stage
        #---------------------------------------------------------------
        # * Method: Adjust State Within Stage
        #---------------------------------------------------------------
        def self.adj_state(id, index, code, value)
          parent = $data_states[id]
          parent.note =~ RINOBI::StateStages::Regexp::Add_Stage
          state_id = state_hash[$1.to_sym][$2.to_sym][index.to_i - 1]
          case code.downcase.to_sym
          when :name then $data_states[state_id].name = value
          when :icon then $data_states[state_id].icon_index = value.to_i
          when :note then $data_states[state_id].note = value
          when :restrict
            #----------------------------
            # >> 0: None
            # >> 1: Attack Enemy
            # >> 2: Attack Enemy Or Ally
            # >> 3: Attack Ally
            # >> 4: Cannot Act
            #----------------------------
            value = 0 if value.to_i < 0
            value = 4 if value.to_i > 4
            $data_states[state_id].restriction = value
          when :priority
            #----------------------------
            # >> 0 - 100 Priority
            #----------------------------
            value = 0 if value.to_i < 0
            value = 100 if value.to_i > 100
            $data_states[state_id].priority = value
          when :remove_end?
            #----------------------------
            # >> true or false
            #----------------------------
            value = true if value.downcase == 'true' || '1'
            value = false unless value
            $data_states[state_id].remove_at_battle_end = value
          when :remove_restrict?
            #----------------------------
            # >> true or false
            #----------------------------
            value = true if value.downcase == 'true' || '1'
            value = false unless value
            $data_states[state_id].remove_by_restriction = value
          when :remove_auto
            #----------------------------
            # >> 0: None
            # >> 1: At End Of Action
            # >> 2: At End Of Turn
            #----------------------------
            value = 0 if value.to_i < 0
            value = 2 if value.to_i > 2
            $data_states[state_id].auto_removal_timing = value
          when :remove_turn
            #----------------------------
            # >> min_turns, max_turns
            #----------------------------
            value = value.scan(/(.*)/)[0]
            $data_states[state_id].min_turns = value[0].to_i
            $data_states[state_id].max_turns = value[1].to_i
          when :remove_dmg?
            #----------------------------
            # >> 0 - 100 Chance
            #----------------------------
            if value.to_i > 0
              $data_states[state_id].remove_by_damage = true
              $data_states[state_id].chance_by_damage = value.to_i
            else
              $data_states[state_id].remove_by_damage = false
            end
          when :remove_walk?
            #----------------------------
            # >> 0 - or above, Steps
            #----------------------------
            if value.to_i > 0
              $data_states[state_id].remove_by_walking = true
              $data_states[state_id].steps_to_remove = value.to_i
            else
              $data_states[state_id].remove_by_walking = false
            end
          when :msg1 then $data_states[state_id].message1 = value
          when :msg2 then $data_states[state_id].message2 = value
          when :msg3 then $data_states[state_id].message3 = value
          when :msg4 then $data_states[state_id].message4 = value
          end # case code.downcase.to_sym
        end # self.adj state
      end # Method Module
    #======================================================================
    # >> Regexp Module
    #======================================================================
      module Regexp
        #---------------------------------------------------------------
        # * Note Tag: Referencing or Adding New States to Stages
        #---------------------------------------------------------------
        Add_Stage = /<(?:Stage|stage):[ ](.*),[ ](.*),[ ](\d+)>/i
        #---------------------------------------------------------------
        # * Note Tag: Adding New States to Stage from Parent State
        #---------------------------------------------------------------
        New_Stage = /<Index:[ ](.*),[ ]Copy:[ ](.*),[ ]Take:[ ](.*)>/i
        #---------------------------------------------------------------
        # * Note Tag: Adjusting State Information, Requires Parent
        #---------------------------------------------------------------
        Adj_State = /<(?:Adj_State|adj_state):[ ](\d+),[ ](.*?):[ ](.*)>/i
        #---------------------------------------------------------------
        # * Note Tag: Optional State Note Tag Adjustment
        #---------------------------------------------------------------
        Adj_Note  = /<Adj_Note,[ ](\d+)>(.*?)<\/Adj_Note>/im
        #---------------------------------------------------------------
        # * Note Tag: Stage Abbreviation Adjustment
        #---------------------------------------------------------------
        Abbr_Name = /<Abbr_Name:[ ](.*)>/i
      end # Regexp Module
end end # DO NOT MODIFY
#==============================================================================
# ** IMPORT SCRIPT
#------------------------------------------------------------------------------
$imported = {} if $imported.nil?    # Setup imported hash if nil.
$imported[:RIN_StateStages] = true  # Add script key to imported hash.
#==============================================================================
# ** DataManager
#------------------------------------------------------------------------------
#  This module manages the database and game objects. Almost all of the 
# global variables used by the game are initialized by this module.
#==============================================================================
module DataManager
  #--------------------------------------------------------------------------
  # * Alias Method: Load Normal Database (For Compatibility)
  #--------------------------------------------------------------------------
  class <<self; alias :load_normal_database_rss :load_normal_database; end
  def self.load_normal_database
    load_normal_database_rss
    load_add_stage
    load_new_stage
    load_adj_state
    load_adj_note
    load_adv_skill_effect
    load_adv_item_effect
    load_adv_features
    load_rss_cleanup
  end # self.load_normal_database
  #--------------------------------------------------------------------------
  # * Alias Method: Load Normal Database (For Compatibility)
  #--------------------------------------------------------------------------
  class <<self; alias :load_battle_database_rss :load_battle_test_database; end
  def self.load_battle_test_database
    load_battle_database_rss
    load_add_stage
    load_new_stage
    load_adj_state
    load_adj_note
    load_adv_skill_effect
    load_adv_item_effect
    load_adv_features
    load_rss_cleanup
  end # self.load_battle_test_database
  #--------------------------------------------------------------------------
  # * New Method: Load State Staging Addition
  #--------------------------------------------------------------------------
  def self.load_add_stage
    $data_states.each do |state|
      next if state.nil?
      next unless state.note =~ RINOBI::StateStages::Regexp::Add_Stage
      next unless $1 && $2 && $3
      method = RINOBI::StateStages::Method
      method.add_stage(state.id, $3.to_i, $2.to_sym, $1.to_sym)
    end # $data_states.each do |state|
  end # self.load_add_stage
  #--------------------------------------------------------------------------
  # * New Method: Load State Staging Creation
  #--------------------------------------------------------------------------
  def self.load_new_stage
    for state in $data_states
      next if state.nil?
      next unless state.note =~ RINOBI::StateStages::Regexp::New_Stage
      state.note.split(/[\r\n]+/).each do |line|
        next unless line =~ RINOBI::StateStages::Regexp::New_Stage
        next unless $1 && $2 || $3
        RINOBI::StateStages::Method.new_stage(state.id, $1, $2, $3)
      end # state.note.split(/[\r\n]+/).each do |line|
    end # for state in $data_states
  end # self.load_new_stage
  #--------------------------------------------------------------------------
  # * New Method: Load State Staging Adjustment
  #--------------------------------------------------------------------------
  def self.load_adj_state
    for state in $data_states
      next if state.nil?
      next unless state.note =~ RINOBI::StateStages::Regexp::Adj_State
      state.note.split(/[\r\n]+/).each do |line|
        next unless line =~ RINOBI::StateStages::Regexp::Adj_State
        next unless $1 && $2 && $3
        RINOBI::StateStages::Method.adj_state(state.id, $1, $2, $3)
      end # state.note.split(/[\r\n]+/).each do |line|
    end # for state in $data_states
  end # self.load_new_stage
  #--------------------------------------------------------------------------
  # * New Method: Load State Staging Adjustment
  #--------------------------------------------------------------------------
  def self.load_adj_note
    for state in $data_states
      next if state.nil?
      next unless state.note =~ RINOBI::StateStages::Regexp::Adj_Note
      notes = state.note.scan(RINOBI::StateStages::Regexp::Adj_Note)
      notes.each do |note|
        index, value = note[0], note[1]
        RINOBI::StateStages::Method.adj_state(state.id, index, "note", value)
      end # note.each do |note|
    end # for state in $data_states
  end # self.load_new_stage
  #--------------------------------------------------------------------------
  # * New Method: Load Skill Effect Advancement
  #--------------------------------------------------------------------------
  def self.load_adv_skill_effect
    state_hash = RINOBI::StateStages::Method.state_hash
    $data_skills.each do |skill|
      next unless skill
      next unless skill.effects.length > 0
      values = Hash.new
      skill_array = Array.new
      for effect in skill.effects
        next unless effect.code == 21
        values[skill.effects.index(effect)] = effect.data_id
      end #--
      values.each {|index, state| skill_array.push(state)}
      repeats = skill_array.inject(Hash.new(0)) {|k, v| k[v] += 1 ; k}
      repeats.each do |state, count|
        next unless count > 1
        indexes = values.select {|vi, vs| vs == state}
        state_hash.each do |shk, shv|
          shv.each do |pnk, pnv|
            next unless pnv.include?(state)
            pnv_index = Hash[pnv.map.with_index.to_a]
            pnv_index = pnv_index[state]
            new_id = pnv[pnv_index + (count - 1)]
            RINOBI::StateStages::Method.adj_seffect(skill.id, new_id, indexes)
            indexes.each {|ii, is| $data_skills[skill.id].effects[ii] = nil}
          end # shv.each do |pnk, pnv|
        end # state_hash.each do |shk, shv|
      end # repeats.each do |state, count|
    end # $data_skills.each do |skill|
  end # self.load_adv_skill_effect
  #--------------------------------------------------------------------------
  # * New Method: Load Item Effect Advancement
  #--------------------------------------------------------------------------
  def self.load_adv_item_effect
    state_hash = RINOBI::StateStages::Method.state_hash
    $data_items.each do |item|
      next unless item
      next unless item.effects.length > 0
      values = Hash.new
      item_array = Array.new
      for effect in item.effects
        next unless effect.code == 21
        values[item.effects.index(effect)] = effect.data_id
      end #--
      values.each {|index, state| item_array.push(state)}
      repeats = item_array.inject(Hash.new(0)) {|k, v| k[v] += 1 ; k}
      repeats.each do |state, count|
        next unless count > 1
        indexes = values.select {|vi, vs| vs == state}
        state_hash.each do |ihk, ihv|
          ihv.each do |pnk, pnv|
            next unless pnv.include?(state)
            pnv_index = Hash[pnv.map.with_index.to_a]
            pnv_index = pnv_index[state]
            new_id = pnv[pnv_index + (count - 1)]
            RINOBI::StateStages::Method.adj_ieffect(item.id, new_id, indexes)
            indexes.each {|ii, is| $data_items[item.id].effects[ii] = nil}
          end # shv.each do |pnk, pnv|
        end # state_hash.each do |ihk, ihv|
      end # repeats.each do |state, count|
    end # $data_items.each do |item|
  end # self.load_adv_item_effect
  #--------------------------------------------------------------------------
  # * New Method: Load Features Advancement
  #--------------------------------------------------------------------------
  def self.load_adv_features
    state_hash = RINOBI::StateStages::Method.state_hash
    adv_feat_array = Array.new
    adv_code_array = [13, 14, 32]
    adv_feat_array.push($data_actors)   ;   adv_feat_array.push($data_classes)
    adv_feat_array.push($data_weapons)  ;   adv_feat_array.push($data_armors)
    adv_feat_array.push($data_enemies)  ;   adv_feat_array.push($data_states)
    adv_feat_array.each do |objects|
      adv_code_array.each do |code|
        objects.each do |object|
          next unless object
          next unless object.features.length > 0
          values = Hash.new
          feature_array = Array.new
          for feature in object.features
            next unless feature
            next unless feature.code == code
            values[object.features.index(feature)] = feature.data_id
          end # for feature in object.features
          values.each {|index, state| feature_array.push(state)}
          repeats = feature_array.inject(Hash.new(0)) {|k, v| k[v] += 1 ; k}
          repeats.each do |state, count|
            next unless count > 1
            indexes = values.select {|vi, vs| vs == state}
            # Index Hash Key, Index Hash Value
            state_hash.each do |ihk, ihv|
              # Pos/Neg Key, Pos/Neg Value
              ihv.each do |pnk, pnv|
                next unless pnv.include?(state)
                pnv_index = Hash[pnv.map.with_index.to_a]
                pnv_index = pnv_index[state]
                new_id = pnv[pnv_index + (count - 1)]
                unless code == 32 # Inclusive
                  count.times do |stage_index|
                  new_id = pnv[pnv_index + stage_index]
                  method = RINOBI::StateStages::Method
                  method.adj_feature(object.id, new_id, indexes, objects, code)
                  end #--
                else # Addive
                  new_id = pnv[pnv_index + (count - 1)]
                  method = RINOBI::StateStages::Method
                  method.adj_feature(object.id, new_id, indexes, objects, code)
                end # unless code == 32
                indexes.each {|ii, is| objects[object.id].features[ii] = nil}
              end # ihv.each do |pnk, pnv|
            end # states_hash.each do |ihk, ihv|
          end # repeats.each do |state, count|
        end # objects.each do |object|
      end # adv_code_array.each do |code|
    end # adv_feat_array.each do |object|
  end # self.load_adv_features
  #--------------------------------------------------------------------------
  # * New Method: Load State Cleanup
  #--------------------------------------------------------------------------
  def self.load_rss_cleanup
    object_array = Array.new
    object_array.push($data_actors)   ;   object_array.push($data_classes)
    object_array.push($data_weapons)  ;   object_array.push($data_armors)
    object_array.push($data_enemies)  ;   object_array.push($data_states)
    object_array.each do |objects|
      objects.each {|object| next unless object ; object.features.compact!}
    end # object_array.each do |objects|
    $data_skills.each {|skill| next unless skill ; skill.effects.compact!}
    $data_items.each {|item | next unless item ; item.effects.compact!}
    $data_states.each do |state|
      next unless state
      state.features.compact!
      state.note.gsub!(RINOBI::StateStages::Regexp::Add_Stage, '')
      state.note.gsub!(RINOBI::StateStages::Regexp::Abbr_Name, '')
      state.note.gsub!(RINOBI::StateStages::Regexp::New_Stage, '')
      state.note.gsub!(RINOBI::StateStages::Regexp::Adj_State, '')
      state.note.gsub!(RINOBI::StateStages::Regexp::Adj_Note, '')
      state.note = state.note.gsub(/\n+|\r+/, "\n").squeeze("\n").strip
    end # $data_states.each do |state|
  end # self.load_ss_cleanup
end # DataManager
#==============================================================================
# ** SceneManager
#------------------------------------------------------------------------------
#  This module manages scene transitions. For example, it can handle
# hierarchical structures such as calling the item screen from the main menu
# or returning from the item screen to the main menu.
#==============================================================================
module SceneManager
  #--------------------------------------------------------------------------
  # * Alias Method: Get First Scene Class
  #--------------------------------------------------------------------------
  class <<self; alias :ss_debug_first_scene_class :first_scene_class; end
  def self.first_scene_class
    if RINOBI::StateStages::Debugger
      state_hash = RINOBI::StateStages::Method.state_hash
      state_hash.each {|key, value| print "#{key} => #{value}\n\n"}
    end # RINOBI::StateStages::Debugger
    ss_debug_first_scene_class
  end # self.first_scene_class
end # SceneManager
#==============================================================================
# ** Game_Battler
#------------------------------------------------------------------------------
#  A battler class with methods for sprites and actions added. This class 
# is used as a super class of the Game_Actor class and Game_Enemy class.
#==============================================================================
class Game_Battler < Game_BattlerBase
  #--------------------------------------------------------------------------
  # * New Method: Remove all staging states.
  #--------------------------------------------------------------------------
  def purge_states
    state_hash = RINOBI::StateStages::Method.state_hash
    state_hash.each do |key, hash|
      hash.each do |k, h| 
        h.each {|id| remove_state(id) if states.any?{|state| state.id == id}}
      end # hash.each do |k, h|
    end # state_hash.each do |key, hash|
  end # purge_states
  #--------------------------------------------------------------------------
  # * New Method: Remove all negative staging states.
  #--------------------------------------------------------------------------
  def neg_removal
    state_hash = RINOBI::StateStages::Method.state_hash
    state_hash.each do |key, hash|
      removal = hash.select {|key| key == :neg}
      removal.each do |key, hash|
        hash.each {|id| remove_state(id) if states.any?{|state| state.id == id}}
      end # removal.each do |key, hash|
    end # state_hash.each do |key, hash|
  end # neg_removal
  #--------------------------------------------------------------------------
  # * New Method: Remove all positive staging states.
  #--------------------------------------------------------------------------
  def pos_removal
    state_hash = RINOBI::StateStages::Method.state_hash
    state_hash.each do |key, hash|
      removal = hash.select {|key| key == :pos}
      removal.each do |key, hash|
        hash.each {|id| remove_state(id) if states.any?{|state| state.id == id}}
      end # removal.each do |key, hash|
    end # state_hash.each do |key, hash|
  end # pos_removal
  #--------------------------------------------------------------------------
  # * New Method: Remove all neutral staging states.
  #--------------------------------------------------------------------------
  def neu_removal
    state_hash = RINOBI::StateStages::Method.state_hash
    state_hash.each do |key, hash|
      removal = hash.select {|key| key == :neu}
      removal.each do |key, hash|
        hash.each {|id| remove_state(id) if states.any?{|state| state.id == id}}
      end # removal.each do |key, hash|
    end # state_hash.each do |key, hash|
  end # pos_removal
  #--------------------------------------------------------------------------
  # * New Method: Optional staging type removal.
  #--------------------------------------------------------------------------
  def type_removal(type_key)
    state_hash = RINOBI::StateStages::Method.state_hash
    state_hash.each do |key, hash|
      removal = hash.select {|key| key == type_key}
      removal.each do |key, hash|
        hash.each {|id| remove_state(id) if states.any?{|state| state.id == id}}
      end # removal.each do |key, hash|
    end # state_hash.each do |key, hash|
  end # type_removal
  #--------------------------------------------------------------------------
  # * New Method: Optional staging state removal.
  #--------------------------------------------------------------------------
  def state_removal(type, stage_key)
    state_hash = RINOBI::StateStages::Method.state_hash
    removal = state_hash[type].select {|key| key == stage_key}
    removal.each do |key, hash|
      hash.each {|id| remove_state(id) if states.any?{|state| state.id == id}}
    end # removal.each do |key, hash|
  end # state_removal
  #--------------------------------------------------------------------------
  # * New Method: Manual Staging
  #--------------------------------------------------------------------------
  def stage(state, type, add = 1, chance = 100)
    return unless rand(100) < chance
    state_hash = RINOBI::StateStages::Method.state_hash
    return unless state_hash.has_key?(state)
    state_array = state_hash[state]
    return unless state_array.has_key?(type)
    type2 = nil
    if state_hash[state].keys.length > 1
      type2 = state_hash[state].keys[1] if type == state_hash[state].keys[0]
      type2 = state_hash[state].keys[0] if type == state_hash[state].keys[1]
    end #------
    if type2 && state_array[type2].any? {|s| state?(s)}
      current = states.select {|c| state_array[type2].include?(c.id)}
      index = Hash[state_array[type2].map.with_index.to_a]
      index = index[current[0].id]
      if index - add == -1
        return remove_state(current[0].id)
      elsif index - add < -1
        @states.delete(current[0].id)
        add -= index + 1
        if add > state_array[type].length
          add = state_array[type].length
        end #--
        add_state(state_array[type][add - 1])
      else
        @states.delete(current[0].id)
        add_state(state_array[type2][index - add])
      end #----
    elsif state_array[type].any? {|s| state?(s)}
      return if state?(state_array[type][-1])
      current = states.select {|c| state_array[type].include?(c.id)}
      index = Hash[state_array[type].map.with_index.to_a]
      index = index[current[0].id]
      current.each {|c| @states.delete(c.id)}
      if add + index >= state_array[type].length
        add = state_array[type].length
        add_state(state_array[type][add - 1])
      else
        add_state(state_array[type][index + add])
      end #----
    else
      add > state_array[type].length ? add = state_array[type].length : add
      add_state(state_array[type][add - 1])
    end # if index - add == -1
  end # stage
  #--------------------------------------------------------------------------
  # * Alias Method: Add State.
  #--------------------------------------------------------------------------
  alias :stage_add_state :add_state
  def add_state(state_id)
    state_hash = RINOBI::StateStages::Method.state_hash
    state_hash.each do |key, hash|
      hash.each do |k, v|
        next unless v.include?(state_id)
        index = v.index(state_id)
        add = index + 1
        state_array = state_hash[key]
        type1 = k ; type2 = nil
        if state_hash[key].keys.length > 1
          type2 = state_hash[key].keys[1] if type1 == state_hash[key].keys[0]
          type2 = state_hash[key].keys[0] if type1 == state_hash[key].keys[1]
        end #------
        if type2 && state_array[type2].any? {|s| state?(s)}
          current = states.select {|c| state_array[type2].include?(c.id)}
          index = Hash[state_array[type2].map.with_index.to_a]
          index = index[current[0].id]
          if index - add == -1
            return remove_state(current[0].id)
          elsif index - add < -1
            @states.delete(current[0].id)
            add -= index + 1
            if add > state_array[type1].length
              add = state_array[type1].length
            end #--
            state_id = state_array[type1][add - 1]
          else
            @states.delete(current[0].id)
            state_id = state_array[type2][index - add]
          end #----
        elsif state_array[type1].any? {|s| state?(s)}
          reset_state_counts(state_id)
          return if state?(state_array[type1][-1])
          current = states.select {|c| state_array[type1].include?(c.id)}
          index = Hash[state_array[type1].map.with_index.to_a]
          index = index[current[0].id]
          current.each {|c| @states.delete(c.id)}
          @states.delete(state_id)
          if add + index >= state_array[type1].length
            add = state_array[type1].length
            state_id = state_array[type1][add - 1]
          else
            state_id = state_array[type1][index + add]
          end # if add + index >= state_array[type1].length
        end # if type2 && state_array[type2].any? {|s| state?(s)}
      end # hash.each do |k, v|
    end # state_hash.each do |key, hash|
    stage_add_state(state_id)
  end # add_state
end # class Game_Battler < Game_BattlerBase
#==============================================================================
# ** Window_Base
#------------------------------------------------------------------------------
#  This is a super class of all windows within the game.
#==============================================================================
class Window_Base < Window
  #--------------------------------------------------------------------------
  # Alias Method: Draw State and Buff/Debuff Icons
  #--------------------------------------------------------------------------
  alias :ss_draw_icons :draw_actor_icons
  def draw_actor_icons(actor, dx, dy, dw = 96)
    ss_draw_icons(actor, dx, dy, dw)
    draw_state_stages(actor, dx, dy, dw)
    draw_stage_abbr(actor, dx, dy, dw)
  end # draw_actor_icons
  #--------------------------------------------------------------------------
  # * New Metod: Draw Current State Number
  #--------------------------------------------------------------------------
  def draw_state_stages(actor, draw_x, draw_y, draw_w)
    return unless SceneManager.scene_is?(Scene_Battle)
    return unless RINOBI::StateStages::Show_Number_Text
    # Font Settings
    reset_font_settings
    contents.font.out_color.alpha = 255
    contents.font.size = RINOBI::StateStages::Number_Size
    contents.font.bold = RINOBI::StateStages::Number_Bold
    draw_x += RINOBI::StateStages::Number_X
    draw_y += RINOBI::StateStages::Number_Y
    # State Loop & ID Iteration
    rise_x = draw_x
    for state in actor.states
      break unless 24 + draw_x < rise_x + draw_w 
      next unless state.icon_index > 0
      state_hash = RINOBI::StateStages::States
      state_hash.each do |key, hash|
        hash.each do |k, a|
          next if a.length < 2
          a.each do |id| 
            next if state.id != id
            stage = Hash[a.map.with_index.to_a]
            contents.font.color = normal_color
            case hash.key(a)
            when :pos
              color = RINOBI::StateStages::Number_Pos_Color
              contents.font.color = text_color(color)
            when :neg
              color = RINOBI::StateStages::Number_Neg_Color
              contents.font.color = text_color(color)
            else #neu
              color = RINOBI::StateStages::Number_Neu_Color
              contents.font.color = text_color(color)
            end #----
            if stage[id] == a.length - 1
              if RINOBI::StateStages::Number_Max_Text
                stage = RINOBI::StateStages::Number_Max_Text
              end #--
            else
              stage = 1 + stage[id]
            end #----
            draw_text(rise_x, draw_y, 24, line_height, stage, 2)
          end # a.each do |id|
        end # hash.each do |k, a|
      end # state_hash.each do |key, hash|
      rise_x += 24
    end # for state in actor.states
    contents.font.out_color = Font.default_out_color
    reset_font_settings
  end # draw_state_stages
  #--------------------------------------------------------------------------
  # * New Method: Draw State Stage Abbreviation
  #--------------------------------------------------------------------------
  def draw_stage_abbr(actor, draw_x, draw_y, draw_w)
    return unless SceneManager.scene_is?(Scene_Battle)
    return unless RINOBI::StateStages::Show_Name_Text
    # Font Settings
    reset_font_settings
    contents.font.out_color.alpha = 255
    contents.font.size = RINOBI::StateStages::Name_Size
    contents.font.bold = RINOBI::StateStages::Name_Bold
    draw_x += RINOBI::StateStages::Name_X
    draw_y += RINOBI::StateStages::Name_Y
    # State Loop & ID Iteration
    rise_x = draw_x
    for state in actor.states
      break unless 24 + draw_x < rise_x + draw_w 
      next unless state.icon_index > 0
      state_hash = RINOBI::StateStages::States
      state_hash.each do |key, hash|
        hash.each do |k, a| 
          a.each do |id|
            next if state.id != id
            unless state.note =~ RINOBI::StateStages::Regexp::Abbr_Name
              stage = key.to_s
            else
              stage = $1
            end #--
            contents.font.color = normal_color
            case hash.key(a)
            when :pos
              color = RINOBI::StateStages::Name_Pos_Color
              contents.font.color = text_color(color)
            when :neg
              color = RINOBI::StateStages::Name_Neg_Color
              contents.font.color = text_color(color)
            else #neu
              color = RINOBI::StateStages::Name_Neu_Color
              contents.font.color = text_color(color)
            end #--
            draw_text(rise_x, draw_y, 24, line_height, stage, 2)
          end # a.each do |id|
        end # hash.each do |k, a| 
      end # state_hash.each do |key, hash|
      rise_x += 24
    end # for state in actor.states
    contents.font.out_color = Font.default_out_color
    reset_font_settings
  end # draw_state_stages
end # Window_Base
#==============================================================================
# # UPDATES
# -----------------------------------------------------------------------------
# Addtional details on individual updates.
#-
# 2.0 [05/11/2016] User Friendly Update
#
#  1. Fixed a bug that broke staging between positive and negative states.
#  2. Added various methods for removing staging states.
#  3. Allowed state staging to fuction with default state adding methods.
#  4. Wrote some proper instructions.
#-
# 2.1 [06/30/2016] State removal no long displayed upon staging.
#
#  1. In the previous version, whenever a state would advance or decline, the
#     the application and removal of the individual states would be displayed
#     as pop-ups by Yanfly's Battle Engine. This update fixes so that only the
#     application of the new state(s) is displayed as a popup.
#-
# 3.0 [07/06/2016] Huge Update
#
#  1. The notetag system has been fully realized in this version of the script.
#     No longer is the developer required to create each individual state
#     within the database in order to setup staging. New states can now be
#     created from parent states within the database, saving a significant
#     amount of time and effort when compared to previous versions.
#  2. Stage names and Staging numbers can now be displayed above icons. This
#     new feature is still experimental, designed to work with YEA's Battle
#     System. Compatibility with other battle systems is not guaranteed.
#  3. The addtion of some addtional script for state removal as well of some
#     improved instructions for make use of these calls.
#-
# 3.2 [07/29/2016] Adding Missing Features
#
# 1. Included the multi-staging feature to work with items as well.
#    Originally, this was only available for skills. Basically it looks for
#    repeat instances of add_state within the 'effects' list and combines them
#    if they're a part of a staging state. Percentage values are rounded.
# 2. Added an alternate means of adjusting notetags during staging setup. Since
#    most notetags are made with a similar format, using:
#    <Adj_State: index, note: value> can easily cause issues. Those issue are
#    addressed with the newly added notetag used solely to adjust state notes.
#-
# 3.3 [08/14/2016] Finishing Touches
# 
# 1. Included the multi-staging for all features. For actors, classes, weapons
#    armors, enemies, and states. Multiple instances of State_Resist,
#    State_Rate, or ATK_State will now account for staging states.
#==============================================================================
# # AUTHOR'S NOTES
# -----------------------------------------------------------------------------
# I actually completed this update well before releasing it due to
# procrastination over writing the instructions. Well, I finally got around to
# to it, so here it is... Stage Stages version 3.0!
#-
# Due to the newly added staging notetags, manual staging will remain a part
# of the script. I've updated the method and removed the defaults from the
# settings module to make room for new features.
#-
# I intend to create an iconset for this script. Something that does away with
# the default stat abbrivations such as ATK and LUK. This will allow for clean
# stage name displays created by this script. For now, users will need to make
# their own. I've already started on the iconset... I'll finish it eventually.
#-
# Finally got around to adding multi-staging for features. With this addtion
# this script finally feels complete. I may add addtional features in the
# future, but as of this update, State Stages is no longer a high priority.
#==============================================================================
# @@@@@  @   @  @@@@    @@@@@  @@@@@   @@@@@  @@@@@  @@@@   @@@@@  @@@@@  @@@@@ 
# @      @@  @  @   @   @   @  @       @      @      @   @    @    @   @    @   
# @@@@@  @ @ @  @   @   @   @  @@@@    @@@@@  @      @@@@     @    @@@@@    @   
# @      @  @@  @   @   @   @  @           @  @      @  @     @    @        @   
# @@@@@  @   @  @@@@    @@@@@  @       @@@@@  @@@@@  @   @  @@@@@  @        @   
#==============================================================================