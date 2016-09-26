get '/' do
	@challenges = Challenge.all
  erb :index
end

post '/' do 
	erb :index
end
