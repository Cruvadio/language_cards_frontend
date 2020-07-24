export const unionClasses = (...classes : Array<string>) => {
    return classes.reduce((prevValue, className, index, array) => {
        return prevValue + " " + className;
    })
}

export const addClassName = (currentClass : string, newClass : string) => {
    return currentClass + " " + newClass;
}