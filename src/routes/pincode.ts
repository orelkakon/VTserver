import { addPin, getPin } from './../db/mysqlAPI'

export const addPinCode = async (username, pincode) => {
    return await addPin(username, pincode)
}


export const getPinCode = async (username) => {
    return await getPin(username)
}