class CreateChallenges < ActiveRecord::Migration
  def change
  	create_table :challenges do |t|
  		t.string 	 :start_id, null: false
  		t.string   :start_name, null: false
  		t.string   :end_id, null: false
  		t.string 	 :end_name, null: false
  		t.integer  :best
      t.string   :record_holder
  		t.timestamps
  	end
  end
end
