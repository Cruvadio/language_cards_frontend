export const unionClasses = (...classes) => {
    return classes.reduce((prevValue, className, index, array) => {
        return prevValue + " " + className;
    })
}

export const addClassName = (currentClass, newClass) => {
    return currentClass + " " + newClass;
}