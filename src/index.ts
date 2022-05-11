import { currentUserLocation } from '$utils/location';
import { toggle } from '$utils/toggle';


document.addEventListener('DOMContentLoaded', async () => {

  const userCurrentLocation = await currentUserLocation();
  toggle.init(userCurrentLocation);

});
