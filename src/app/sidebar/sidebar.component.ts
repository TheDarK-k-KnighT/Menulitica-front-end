import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Live Orders',         icon:'nc-bank',       class: '' },
    { path: '/icons',         title: 'Menu changes',             icon:'nc-bag-16',    class: '' },
    { path: '/analysis',          title: 'Analysis',              icon:'nc-chart-pie-36',      class: '' },
    { path: '/notifications', title: 'Update Prices',     icon:'nc-settings',    class: '' },
    { path: '/offers',          title: 'Offers',      icon:'nc-bulb-63',  class: '' },
    { path: '/table',         title: 'Restaurant Details',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
