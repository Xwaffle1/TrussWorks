import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Planet } from '../types/Planet';
import PlanetsTableEntry from './PlanetTableEntry';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function PlanetsTable() {

    const API_URL = "https://swapi.dev/api/planets/?format=json"

    const [loading, setLoading] = useState<boolean>(true)
    const [pagePlanets, setPagePlanets] = useState<Planet[]>([])
    const [error, setError] = useState<any>(null)
    const [nextPage, setNextPage] = useState<string>("")
    
    useEffect(()=>{
      queryPlanets(API_URL)
    }, [])

  function queryPlanets(url: string){
    setLoading(true)

    console.log("Querying for planets..." + url)

    fetch(url).then(res => res.json()).then(data => {
      setLoading(false)        
      setNextPage(data.next)      

      let sortedResults : Planet[] = data.results
      // sort by name
      sortedResults.sort((a : Planet, b : Planet) => { return a.name.localeCompare(b.name) })
      setPagePlanets(sortedResults)

      if(data.results.length === 0){
        setError("No planets found")
      }
    }).catch((err)=>{
      setError(err)
    })
  }

  if(loading === true){
    return <div><p>Loading ...</p> <CircularProgress /></div>
  }

  
  if(error != null){ // not undefined or null
    return <div><p>Failed to load the requested data... Sorry :(</p></div>
  }


  return (
    <TableContainer component={Paper}>
      {/* Super Secret Next Page button */}

      {/* <div>
        {
          nextPage != null && <Button onClick={ ()=> queryPlanets(nextPage)} variant="contained" style={{float: "right"}}>Next Page</Button>
        }
      </div> */}
      <Table sx={{border: 1, borderColor: "gray"}}>
      <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Climate</TableCell>
            <TableCell align="right">Residents</TableCell>
            <TableCell align="right">Terrains</TableCell>
            <TableCell align="right">Population</TableCell>
            <TableCell align="right">Surface Area (by water)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pagePlanets.map((planet, index) => {
              return (
                  <PlanetsTableEntry planet={planet} index={index} key={index} />
              )
            })
          }
        </TableBody>        
      </Table>
    </TableContainer>
  );
}