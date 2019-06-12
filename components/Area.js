import Boundary, {Events} from 'react-native-boundary';

class MyComponent extends Class {
  componentWillMount() {
    Boundary.add({
      lat: 60.381334,
      lng: 5.331186,
      radius: 50, // in meters
      id: "Lesesalen",
    })
      .then(() => console.log("success!"))
      .catch(e => console.error("error :(", e));
   
    Boundary.on(Events.ENTER, id => {
      console.log(`Get out of my ${id}!!`);
    });
    
    Boundary.on(Events.EXIT, id => {
      console.log(`Ya! You better get out of my ${id}!!`)
    })
  }
  
  componentWillUnmount() {
    // Remove the events
    Boundary.off(Events.ENTER)
    Boundary.off(Events.EXIT)

    // Remove the boundary from native API´s
    Boundary.remove('Chipotle')
      .then(() => console.log('Goodbye Chipotle :('))
      .catch(e => console.log('Failed to delete Chipotle :)', e))
  }
}