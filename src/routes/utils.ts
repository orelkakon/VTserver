import { getData } from './../db/mysqlAPI'

export const getMemberData = async (username) => {
    return await getData(username)
}