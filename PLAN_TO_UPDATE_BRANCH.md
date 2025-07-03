# Plan to Update Branch `work` with `main`

1. Fetch the latest changes from `main`:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Switch back to the feature branch and merge:
   ```bash
   git checkout work
   git merge main
   ```
   Resolve any merge conflicts, commit the merge, and rerun tests.
3. Push the updated branch:
   ```bash
   git push origin work
   ```
4. Once the branch includes the updates from `main`, open a Pull Request targeting `main`.
