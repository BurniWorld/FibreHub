---
description: Deploy the Next.js web app to Vercel and create a shareable link
---

# Vercel Deployment Workflow

Use this workflow to deploy the OmniDome dashboard to Vercel for sharing or production.

## Prerequisites

1. Ensure code is committed:
   // turbo
   ```bash
   git status
   ```
   
2. If there are uncommitted changes, commit them:
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

3. Push to GitHub:
   // turbo
   ```bash
   git push origin main
   ```

## Initial Setup (First Time Only)

If this is the first deployment:

4. Go to [vercel.com](https://vercel.com) and sign in with GitHub

5. Click "Add New Project" → "Import Git Repository"

6. Select `BurniWorld/FibreHub` repository

7. **Critical Configuration:**
   | Setting | Value |
   |---------|-------|
   | Project Name | `omni-dome` (lowercase) |
   | Root Directory | `apps/web` |
   | Framework Preset | Next.js |
   | Build Command | (leave default) |
   | Output Directory | (leave default) |

8. Click "Deploy"

## Subsequent Deployments

If Vercel is already connected:

// turbo
9. Simply push to main - Vercel auto-deploys:
   ```bash
   git push origin main
   ```

10. Monitor deployment at:
    - https://vercel.com/[your-team]/omni-dome

## Deployment URLs

After successful deployment, your app is available at:

| Environment | URL Pattern |
|-------------|-------------|
| Production | `https://omni-dome.vercel.app` |
| Preview (per-branch) | `https://omni-dome-git-[branch]-[team].vercel.app` |
| Preview (per-commit) | `https://omni-dome-[hash]-[team].vercel.app` |

## Troubleshooting

### Build Failed: "No fastapi entrypoint found"

**Cause:** Root directory not set correctly.

**Fix:**
1. Go to Project Settings → General
2. Set Root Directory to `apps/web`
3. Redeploy

### Build Failed: TypeScript errors

**Quick fix (if errors are minor):**
// turbo
```bash
# Already configured in next.config.mjs
typescript: {
  ignoreBuildErrors: true,
}
```

**Proper fix:**
1. Run locally: `npm run build`
2. Fix all TypeScript errors
3. Push and redeploy

### Environment Variables

If your app needs environment variables:

1. Go to Project Settings → Environment Variables
2. Add variables (e.g., `NEXT_PUBLIC_API_URL`)
3. Redeploy for changes to take effect

## Custom Domain (Optional)

To use a custom domain:

1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your domain (e.g., `app.omnidome.co.za`)
4. Add the DNS records shown to your domain registrar
5. Wait for SSL certificate (automatic)

## Sharing the Deployment

### Share with Team
Copy the production URL:
```
https://omni-dome.vercel.app
```

### Share with Stakeholders
Use a preview deployment URL for a specific version:
```
https://omni-dome-[commit-hash].vercel.app
```

### Protect with Password (Pro feature)
In Project Settings → Password Protection, enable for staging.

## Rollback

If a deployment has issues:

1. Go to Deployments tab
2. Find the last working deployment
3. Click ⋮ → "Promote to Production"

## Completion

After deployment succeeds:

- [ ] Verify production URL loads correctly
- [ ] Test critical user flows
- [ ] Check mobile responsiveness
- [ ] Share URL with stakeholders
