import { currentUserLocation } from '$utils/location';
import { toggle } from '$utils/toggle';


document.addEventListener('DOMContentLoaded', async () => {

  const userCurrentLocation = await currentUserLocation();
  toggle.init(userCurrentLocation);

  $('#prefix-dropdown-list').on('click', '.prefix-dropdown_item', toggle.selectItem);
});
