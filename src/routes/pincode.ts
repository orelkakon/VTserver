import { addPin, getPin, checkPin } from './../db/mysqlAPI'

export const addPinCode = async (username, pincode) => {
    return await addPin(username, pincode)
}

export const existPinCode = async (pincode, username) => {
    return await checkPin(pincode, username)
}

export const getPinCode = async (username) => {
    return await getPin(username)
}