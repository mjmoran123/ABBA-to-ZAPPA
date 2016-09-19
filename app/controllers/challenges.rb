get '/challenges' do 
	@challenges = Challenge.all
	erb :'challenges/index'
end