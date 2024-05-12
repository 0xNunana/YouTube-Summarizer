import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsButtonLink extends Schema.Component {
  collectionName: 'components_components_button_links';
  info: {
    displayName: 'ButtonLink';
  };
  attributes: {
    url: Attribute.String;
    text: Attribute.String;
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface ComponentsCard extends Schema.Component {
  collectionName: 'components_components_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    event_name: Attribute.String;
    info: Attribute.Text;
    eventdate: Attribute.Date;
    background: Attribute.Media;
  };
}

export interface LayoutCalendarSection extends Schema.Component {
  collectionName: 'components_layout_calendar_sections';
  info: {
    displayName: 'Calendar section';
  };
  attributes: {
    text: Attribute.String;
    description: Attribute.Text;
    eventcard: Attribute.Component<'components.card', true>;
  };
}

export interface LayoutFooter extends Schema.Component {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    copy: Attribute.String;
    contact: Attribute.String;
  };
}

export interface LayoutHeader extends Schema.Component {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    logo: Attribute.Media;
    menu: Attribute.Component<'components.button-link', true>;
    signinout: Attribute.Component<'components.button-link'>;
  };
}

export interface LayoutHero extends Schema.Component {
  collectionName: 'components_layout_heroes';
  info: {
    displayName: 'Hero';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    subheading: Attribute.Text;
    image: Attribute.Media;
    Link: Attribute.Component<'components.button-link'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.button-link': ComponentsButtonLink;
      'components.card': ComponentsCard;
      'layout.calendar-section': LayoutCalendarSection;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'layout.hero': LayoutHero;
    }
  }
}
