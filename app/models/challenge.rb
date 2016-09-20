class Challenge < ActiveRecord::Base
  has_many :games
  has_many :players, through: :games


  def avg_score
  	total = 0
  	avg = "none"
  	if self.games.count && self.games.count != 0
	  	self.games.each do |game|
	  		total += game.score
	  	end
	  	avg = total / self.games.count
	  end
  	return avg
  end
end
