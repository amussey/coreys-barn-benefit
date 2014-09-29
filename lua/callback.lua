local key = '<STRIPE PRIVATE API KEY>'

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

if charge.statuscode == 200 then
    return "Thank you for ordering a " .. callback.order .. "!"
else
    return "Charge rejected for a " .. callback.order .. "!"
end

return callback
