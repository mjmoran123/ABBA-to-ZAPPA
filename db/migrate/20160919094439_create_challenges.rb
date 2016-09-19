class CreateChallenges < ActiveRecord::Migration
  def change
  	create_table :challenges do |t|
  		t.string 	 :start, null: false
  		t.string 	 :end, null: false
  		t.integer  :best
  		t.timestamps
  	end
  end
end
