import metroRouteShape from '../data/routes/metro/route-shape.json';
import trainRouteShape from '../data/routes/trains/route-shape.json';
// import trainRouteInfo from '../data/routes/trains/route-info.json'

function Routes({ map, methods }) {

  let routeCoord = {
    metro: [], T9: [],
  };

  metroRouteShape.forEach((el) => {
    routeCoord.metro.push({ lat: el.shape_pt_lat, lng: el.shape_pt_lon} )
  })

  let T9RouteShape = trainRouteShape.filter((el) => {
    return el.shape_id === 'NTH_1a' || el.shape_id === 'NTH_2a'
  })
  T9RouteShape.forEach((el) => {
    routeCoord.T9.push({ lat: el.shape_pt_lat, lng: el.shape_pt_lon} )
  })

  // let T9RouteShape = trainRouteShape.filter((el) => {
  //   return el.shape_id === 'NTH_1a' || el.shape_id === 'NTH_2a'
  // })
  // T9RouteShape.forEach((el) => {
  //   routeCoord.T9.push({ lat: el.shape_pt_lat, lng: el.shape_pt_lon} )
  // })

  // console.log(routeCoord.T9)

  const renderRoutes = (map, methods) => {
    // console.log('rendering', map, methods)
    renderPolylines(map, methods, routeCoord.metro, '#168388')
    renderPolylines(map, methods, routeCoord.T9, '#D11F2F')
    return true
  }
  
  const renderPolylines = (map, methods, routeCoord, colour) => {
    // console.log('maps', maps)
    /** Example of rendering geodesic polyline */
    let geodesicPolyline = new window.google.maps.Polyline({
      path: routeCoord,
      geodesic: true,
      strokeColor: colour,
      strokeOpacity: 0.3,
      strokeWeight: 5
    })
    geodesicPolyline.setMap(map)
  }

  return (
    renderRoutes(map, methods)
  )
}

export default Routes;