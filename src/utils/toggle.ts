import { countries } from '$utils/country';

var data;

async function init(currentUserLocation: string) {
  data = await countries();

  let dropdownList = $('#prefix-dropdown-list');
  let dropdownItem = dropdownList.children('.prefix-dropdown_item');
  dropdownList.children().remove();

  data.map((country: any, index: number) => {
    let item = dropdownItem.clone();

    if (country.cca2 === currentUserLocation) {
      item = setCurrentItem(item, country);
    }

    //customize item before to append to list
    item.children('img').attr('src', country.flag);
    item.children('div').text(country.cca2);

    //tabindex is used to set the focus on the item when navigate using arrows
    item.attr('tabindex', index);
    item.attr('role', 'option');

    //this custom attributes will be used to define focus in mutation
    item.attr('data-prefix', country.prefix);
    item.attr('data-cca2', country.cca2);

    item.appendTo(dropdownList);
  });

  new MutationObserver(() => {
    $('#prefix-dropdown-list .w--current').trigger('focus');
  }).observe($('#prefix-dropdown-list-wrapper')[0], { attributes: true });
}

function setCurrentItem(item: JQuery<HTMLElement>, country: any): JQuery<HTMLElement> {
  //set config to define selected item
  item.addClass('w--current');
  item.attr('aria-selected', 'true');

  //save current country information in hidden input
  $('input[name=countrCode]').val(country.prefix);
  $('input[name=countryCode]').attr('data-cca2', country.cca2);

  //update toggle component
  $('#prefix-dropdown-toggle').children('img').attr('src', country.flag);
  $('#prefix-dropdown-toggle').children('div[data-element="value"]').text(country.prefix);

  return item;
}

export const toggle = {
  init,
};
