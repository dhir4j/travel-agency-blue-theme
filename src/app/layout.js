import './globals.css'

export const metadata = {
  title: 'Waynex Tours and Travels - Journey to Explore World',
  description: 'Your passport to adventure awaits! Embark on a Journey to Explore World with Waynex Tours and Travels, where every step reveals a new story.',
  keywords: 'travel, tours, vacation, holiday, adventure, destinations, Waynex',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="https://i.postimg.cc/LXkGGm9H/favicon.png" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet"/>
      </head>
      <body id="top">
        {children}
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
      </body>
    </html>
  )
}
