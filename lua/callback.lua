local key = '<STRIPE PRIVATE API KEY>'
local USERNAME = '<GMAIL USERNAME>'
local PASSWORD = '<GMAIL PASSWORD>'
local SERVER = 'smtp.gmail.com'
local FROM_ADDRESS = USERNAME .. '@gmail.com'

if request.method ~= "POST" then
    return 302, '', {Location='https://amussey.github.com/coreys-barn-benefit/'}
end

if storage.callbacks == nil then
    storage.callbacks = "{}"
    callbacks = {}
else
    storage.callbacks = json.parse(storage.callbacks)
end

local callback = json.parse(request.form.token)

table.insert(callbacks, callback)
storage.callbacks = json.stringify(callbacks)

local charge = http.request({
    method='post',
    url='https://api.stripe.com/v1/charges',
    auth={key, ''}, -- basic auth
    data={
        currency='usd',
        description=callback.order .. " Order",
        card=callback.id,
        amount=callback.charge
    }})

if charge.statuscode == 200 then
    local lustache = require 'lustache'
    local response = http.request {
        url = 'https://amussey.github.io/coreys-barn-benefit/lua/email',
    }


    emailbody = lustache:render(response.content, {["name"]=callback.card.name, ["mailto"]=FROM_ADDRESS})

    email.send {
        server=SERVER, username=USERNAME, password=PASSWORD,
        from=FROM_ADDRESS,
        to=callback.email,
        subject='Corey\'s Barn Benefit: Donation received',
        html=emailbody
    }

    return 302, '', {Location='https://amussey.github.com/coreys-barn-benefit/thankyou'}
else
    return "Your charge for $" .. (callback.charge/100) .. " failed.  Please contact " .. FROM_ADDRESS .. "."
end

return callback
