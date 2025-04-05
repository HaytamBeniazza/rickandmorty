# Rick and Morty Character Explorer

A beautiful, responsive React application that allows users to explore characters from the Rick and Morty universe. Built with React, TypeScript, Vite, and Tailwind CSS.

## 🌟 Features

- **Character Browsing**: Browse through all Rick and Morty characters with a beautiful, responsive grid layout
- **Advanced Filtering**: Filter characters by:
  - Name (search)
  - Status (Alive, Dead, Unknown)
  - Species
  - Gender
- **Favorites System**: Add/remove characters to favorites, stored locally
- **Detailed Views**: View detailed information about each character
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop
- **Loading States**: Beautiful loading skeletons and transitions
- **Modern UI/UX**: Sleek design with hover effects, transitions, and animations

## 🚀 Live Demo

Visit the live application: [Rick and Morty Explorer](https://dreamy-kitten-e18e2c.netlify.app)

## 🛠 Tech Stack

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Hooks + Local Storage
- **API**: Rick and Morty API
- **Hosting**: Netlify

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CharacterCard/  # Character display card
│   ├── Filters/        # Search and filter components
│   └── Pagination/     # Pagination controls
├── pages/              # Route pages
│   ├── CharacterList/  # Main character listing
│   ├── CharacterDetail/# Individual character view
│   └── Favorites/      # Favorites page
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🔧 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/HaytamBeniazza/rickandmorty.git
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🎨 Features in Detail

### Character Listing
- Responsive grid layout
- Skeleton loading states
- Smooth image loading transitions
- Hover effects and animations

### Search & Filtering
- Debounced search input
- Multiple filter combinations
- Clear filters option
- Filter visibility toggle for mobile

### Character Details
- Comprehensive character information
- Status indicators with appropriate icons
- Location and origin information
- Episode appearance count
- Related characters section

### Favorites System
- Add/remove favorites with animation
- Persistent storage using localStorage
- Dedicated favorites page
- Favorite count indicator

## 🔄 State Management

The application uses React's built-in state management with hooks:
- `useState` for component-level state
- `useEffect` for side effects and API calls
- `useCallback` for memoized callbacks
- `useMemo` for computed values
- Custom `useLocalStorage` hook for persistent storage

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔍 Search Implementation

- Debounced search to prevent excessive API calls
- Immediate UI feedback
- Clear search functionality
- Combined filtering with other parameters

## 🎯 Future Improvements

1. **Database Integration**: Migrate from localStorage to a proper database (e.g., Supabase) for favorites
2. **Authentication**: Add user accounts to persist favorites across devices
3. **Advanced Filtering**: Add more filter options (e.g., episode appearances)
4. **Offline Support**: Implement service workers for offline functionality
5. **Performance Optimization**: Implement virtual scrolling for large lists
6. **Social Features**: Add sharing functionality for characters

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.