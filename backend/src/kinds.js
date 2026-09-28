// Content types the admin can manage. Field names are constants (never user input).
export const KINDS = {
  announcements: { table: 'announcements', fields: { title: 'TEXT', link: 'TEXT' } },
  stories: { table: 'stories', fields: { title: 'TEXT', subtitle: 'TEXT', image: 'TEXT', link: 'TEXT' } },
  calls: { table: 'calls', fields: { kicker: 'TEXT', title: 'TEXT', link: 'TEXT' } },
  team: { table: 'team_members', fields: { name: 'TEXT', role: 'TEXT', bio: 'TEXT', photo: 'TEXT' } },
  stats: { table: 'stats', fields: { label: 'TEXT', value: 'INTEGER' } },
}

export const SUBMISSIONS = {
  contact: 'contact_messages',
  join: 'join_requests',
  newsletter: 'newsletter_subscribers',
}
