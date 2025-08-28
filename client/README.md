# SokoTrack

# 1. Make sure you’re on main and up to date
git checkout main
git pull origin main

# 2. Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# 3. Work on code, then stage and commit changes
git add .
git commit -m "your commit message"

# 4. Push the new branch to remote (first time only)
git push -u origin feature/your-feature-name

# 5. When done, go back to main and update
git checkout main
git pull origin main

# 6. Merge your feature branch into main
git merge feature/your-feature-name

# 7. Push updated main
git push origin main

# 8. (Optional) Delete the feature branch locally and remotely
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name

#############################################
## REBASE:
# 1. Make sure you’re on main and up to date
git checkout main
git pull origin main

# 2. Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# 3. Work on code, then stage and commit changes
git add .
git commit -m "your commit message"

# 4. Push the new branch to remote (first time only)
git push -u origin feature/your-feature-name

# 5. When done, go back to main and update
git checkout main
git pull origin main

# 6. Rebase feature branch onto latest main
git checkout feature/your-feature-name
git rebase main

# 7. Switch back to main and fast-forward merge
git checkout main
git merge feature/your-feature-name

# 8. Push updated main
git push origin main

# 9. (Optional) Delete the feature branch locally and remotely
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name


## testing achievements.