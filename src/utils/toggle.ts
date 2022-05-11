import { countries } from '$utils/country';

async function init(currentUserLocation: string) {
  const data = await countries();

  const dropdownList = $('#prefix-dropdown-list');
  const dropdownItem = dropdownList.children('.prefix-dropdown_item');
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

function selectItem(e: any) {
  //remove current state from old item
  $('#prefix-dropdown-list .w--current').removeClass('w--current');

  setCurrentItem($(e.currentTarget), {
    prefix: $(e.currentTarget).attr('data-prefix') ?? '',
    cca2: $(e.currentTarget).attr('data-cca2') ?? '',
    flag: $(e.currentTarget).children('img').attr('src') ?? '',
  });

  //close dropdown
  $('#prefix-dropdown-toggle').trigger('w-close.w-dropdown');
}

/**
 * keycode reference https://github.com/ku-fpg/blackboard/wiki/jQuery-Keycode-Cheatsheet
 * @param e event of keydown
 *  */
function navigate(e: any) {
  switch (e.which) {
    case 38: //up
      let up = e.currentTarget.tabIndex;
      $(`.prefix-dropdown_item[tabindex="${--up}"]`).trigger('focus');
      break;
    case 40: //down
      let down = e.currentTarget.tabIndex;
      $(`.prefix-dropdown_item[tabindex="${++down}"]`).trigger('focus');
      break;
    case 13: //enter
      selectItem(e);
      break;
    case 9: //tab
      $('#prefix-dropdown-toggle').trigger('w-close.w-dropdown');
      break;
    case 32: //space
      selectItem(e);
      break;
    default:
      $('.prefix-dropdown_item')
        .filter((_, el) => {
          let cca2 = el.getAttribute('data-cca2') ?? '';
          return cca2.toLowerCase().startsWith(String.fromCharCode(e.which).toLowerCase());
        })
        .first()
        .trigger('focus');
      break;
  }
}

export const toggle = {
  init,
  selectItem,
  navigate,
};