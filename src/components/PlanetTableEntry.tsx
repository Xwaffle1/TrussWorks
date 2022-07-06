import { TableCell, TableRow } from '@mui/material';
import { Planet } from '../types/Planet';

export default function PlanetsTableEntry({ planet, index }: { planet: Planet, index: number }) {

    function formatValue(value: string){
        // value is a number
        
        if(!isNaN(Number(value))){
            const numericalVal = Number(value)
            // split numericalVal into a string with groups of 3 digits seperated by a space
            const formattedVal = numericalVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            if(numericalVal > 999){
                return formattedVal
            }
        }

        return value === "unknown" ? "?" : value
    }

    function findWaterSurfaceArea(){
        // Find surface area of a sphere with radius of planet's diameter minus the planet's water surface

        if(planet.surface_water === "unknown" || planet.diameter === "unknown"){
            return "?"
        }

        const radius : number = Number(planet.diameter) / 2
        const surface_water_percentage : number = Number(planet.surface_water) / 100
        const surface_area : number = Math.PI * radius * radius
        const surface_area_with_water : number = surface_area * surface_water_percentage;

        // Debug :) 
        // console.log(planet.diameter)
        // console.log(radius)
        // console.log(planet.surface_water)
        // console.log(surface_water_percentage)
        // console.log(surface_area)
        // console.log(`${surface_area} * ${surface_water_percentage}`)
        // console.log(planet.name + " has a surface area of " + surface_area_with_water + " sq. km")

        return Math.round(surface_area_with_water).toString()
    }

    const waterSurfaceArea = findWaterSurfaceArea()
    return (
        <TableRow key={index}>
            <TableCell>
                {/* Force New Tab, and security vulnerability in using _blank */}
                <a href={planet.url} target="_blank" rel="noopener noreferrer" >{planet.name}</a>
            </TableCell>
            <TableCell align="right">
                <p>{formatValue(planet.climate)}</p>
            </TableCell>
            <TableCell align="right">
                <p>{planet.residents.length}</p>
            </TableCell>
            <TableCell align="right">
                <p>{formatValue(planet.terrain)}</p>
            </TableCell>
            <TableCell align="right">
                <p>{formatValue(planet.population)}</p>
            </TableCell>
            <TableCell align="right">
                <p>{formatValue(waterSurfaceArea)} km^2</p>
            </TableCell>
        </TableRow>
    )
}