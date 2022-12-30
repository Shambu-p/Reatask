export default interface Task {
    Id: number
    Name: string
    FeatureId: number
    StartDate: number
    EndDate: number
    Status: ("pending"|"active"|"finished")
    Time: number
}