get '/' do

  erb :index
end

post '/' do 
	p JSON.parse(params.to_s)
	erb :index
end
