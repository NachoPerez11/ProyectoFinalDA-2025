const dependencies = {};
export function getDependency(name) {
    if (!dependencies[name]) {
        throw new Error(`Dependency ${name} no se encontró`);
    }
    
    return dependencies[name];
}

export function addDependency(name, dependency) {
    if (dependencies[name]) {
        throw new Error(`Dependency ${name} already exists`);
    }

    dependencies[name] = dependency;
}