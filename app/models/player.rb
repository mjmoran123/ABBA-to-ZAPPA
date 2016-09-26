require 'bcrypt'
class Player < ActiveRecord::Base
  include BCrypt

  has_many :games
  has_many :challenges, through: :games

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password_hash, presence: true

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def self.authenticate(username, password_entered)
    player = Player.find_by(username: username)
    if player && player.password == password_entered
      return player
    else
      return nil
    end
  end
end
