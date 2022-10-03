export function getMonthStart(month: string): string {
    return `${new Date().getFullYear()}-0${monthAsNumber(month)}-01`
}

export function getMonthEnd(month: string): string {
    return `${new Date().getFullYear()}-0${monthAsNumber(month) + 1}-01`
}

function monthAsNumber(month: string): number {
    switch (month) {
        case "1":
        case "jan":
        case "january":
            return 1
        case "2":
        case "feb":
        case "february":
            return 2
        case "3":
        case "mar":
        case "march":
            return 3
        case "4":
        case "apr":
        case "april":
            return 4
        case "5":
        case "may":
        case "may":
            return 5
        case "6":
        case "jun":
        case "june":
            return 6
        case "7":
        case "jul":
        case "july":
            return 7
        case "8":
        case "aug":
        case "august":
            return 8
        case "9":
        case "sep":
        case "september":
            return 9
        case "10":
        case "oct":
        case "october":
            return 10
        case "11":
        case "nov":
        case "november":
            return 11
        case "12":
        case "dec":
        case "december":
            return 12
        default:
            throw Error(`month received was not recognised`)
    }
}
