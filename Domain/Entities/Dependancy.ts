
export default class Dependancy {
    Id: number
    Dependant: number
    DependsOn: number
    State: ("pending"|"active"|"finished")
}