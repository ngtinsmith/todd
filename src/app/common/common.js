import { s, DOM } from '../utils/base'

const toggleClass = (e, toggle, delegate, state = 'is-open') => {
    const isToggle = e.target.matches(toggle)

    if (isToggle) {
        delegate.classList.toggle(state)
    }
}

const toggleUserMenu = e => {
    toggleClass(e, DOM.headerUserAvatar, s(DOM.headerUser))
}

const toggleSidebar = e => {
    const toggle = e.target.matches(DOM.sidebarToggle) 
                        ? DOM.sidebarToggle
                        : DOM.sidebarTWrapper

    toggleClass(e, toggle, s(DOM.sidebar), 'is-collapsed')
}

const toggleWSDropdown = e => {
    toggleClass(e, DOM.wsDropdownToggle, s(DOM.wsDropdown))
}

const toggleWSSettings = e => {
    const toggle = e.target.matches(DOM.wsSettingsToggle) 
                        ? DOM.wsSettingsToggle
                        : DOM.wsSettingsTClose

    toggleClass(e, toggle, s(DOM.wsSettings))
}

export const toggleEventListeners = () => {
    s(DOM.header).addEventListener('click', toggleUserMenu)
    s(DOM.sidebar).addEventListener('click', toggleSidebar)
    s(DOM.wsDropdown).addEventListener('click', toggleWSDropdown)
    s(DOM.wsSettings).addEventListener('click', toggleWSSettings)
}