
export default interface Dependancy {
    Id: number
    Dependant: number
    DependsOn: number
    State: ("pending"|"active"|"finished")
}