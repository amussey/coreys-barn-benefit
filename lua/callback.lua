local key = '<STRIPE PRIVATE API KEY>'
local USERNAME = '<GMAIL USERNAME>'
local PASSWORD = '<GMAIL PASSWORD>'
local SERVER = 'smtp.gmail.com'
local FROM_ADDRESS = USERNAME .. '@gmail.com'

local uuid = require("amussey/lib/lua/webscriptio/uuid")

if request.method ~= "POST" then
    return 302, '', {Location='https://amussey.github.io/coreys-barn-benefit/'}
end

if storage.callbacks == nil then
    storage.callbacks = "{}"
    callbacks = {}
else
    callbacks = json.parse(storage.callbacks)
end

local callback = json.parse(request.form.token)

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

callback.uuid = uuid()

if charge.statuscode == 200 then
    table.insert(callbacks, callback)
    storage.callbacks = json.stringify(callbacks)

    local lustache = require 'lustache'
    local response = http.request {
        url = 'https://amussey.github.io/coreys-barn-benefit/lua/email',
    }
    local responseValues = {
        ["name"]=callback.card.name,
        ["mailto"]=FROM_ADDRESS
    }

    emailbody = lustache:render(response.content, responseValues)

    email.send {
        server=SERVER, username=USERNAME, password=PASSWORD,
        from=FROM_ADDRESS,
        to=callback.email,
        subject='Corey\'s Barn Benefit: Donation received',
        html=emailbody
    }

    return 302, '', {Location='https://amussey.github.io/coreys-barn-benefit/thankyou'}
else
    return "Your charge for $" .. (callback.charge/100) .. " failed.  This could either be due to an issue with the payment processing or with the credit card information being entered incorrectly.  Please contact " .. FROM_ADDRESS .. "."
end

return callback
