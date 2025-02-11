# Project Overview  

This project adds **rating and review functionalities** to the **Mautic Marketplace**, allowing users to provide feedback on marketplace items.  

## Installation Guide  

### Prerequisites  

Ensure you have the following installed:  
- **Node.js** (latest LTS version recommended)  
- **Git**  

### Setup Instructions  

#### 1. Fork and Clone the Repository  

First, fork the repository on GitHub:  
🔗 [Mautic Marketplace Frontend](https://github.com/mautic/marketplace-frontend)  

Then, clone your forked repository:  

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/marketplace-frontend.git
```

#### 2. Navigate to the Project Directory  

```bash
cd marketplace-frontend
```

#### 3. Configure Authentication  

This project uses **Auth0** for authentication and **Supabase** as a backend service. You need to set up your credentials before running the project.

##### **Step 3.1: Setup Auth0 Credentials**  

1. Sign up or log in to [Auth0](https://auth0.com/).  
2. Create a new **Single Page Application** in the Auth0 dashboard.  
3. Navigate to **Settings** and copy the following credentials:  
   - **Domain**  
   - **Client ID**  

In the `src/index.jsx` file, configure these credentials by replacing the placeholders with your Auth0 credentials.

##### **Step 3.2: Setup Supabase Credentials**  

1. Sign up or log in to [Supabase](https://supabase.com/).  
2. Create a new project in the Supabase dashboard.  
3. Navigate to **Project Settings** → **API** and copy the following credentials:  
   - **Supabase URL**  
   - **Anon Public Key**  

In the `src/supabase.js` file, update the configuration with your Supabase credentials.

#### 4. Install Dependencies  

```bash
npm install
```

#### 5. Start the Development Server  

```bash
npm run dev
```
 
