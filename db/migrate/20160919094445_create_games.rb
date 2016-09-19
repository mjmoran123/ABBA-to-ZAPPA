class CreateGames < ActiveRecord::Migration
  def change
  	create_table :games do |t|
  		t.integer  :player_id, null: false
  		t.integer  :challenge_id, null: false
  		t.integer  :score
  		t.timestamps
  	end
  end
end
