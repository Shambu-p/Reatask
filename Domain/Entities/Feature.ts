
export default interface Feature {
    Id: number
    Name: string
    Description: string
    Category: number
    State: ("pending"|"active"|"finished")
}