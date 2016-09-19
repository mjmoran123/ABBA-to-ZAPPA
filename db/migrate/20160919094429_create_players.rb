class CreatePlayers < ActiveRecord::Migration
  def change
  	create_table :players do |t|
  		t.string   :username, null: false
  		t.string   :email, null: false
  		t.string   :password_hash, null: false
  		t.timestamps
  	end
  end
end
