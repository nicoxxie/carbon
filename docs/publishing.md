# Publishing

```bash
./tasks/publish.sh -m "chore(release): publish %v" --exact --conventional-commits --cd-version patch --force-publish=*
```

## Pre-releases

```bash
/tasks/publish.sh -m "chore(package): update package versions" --exact --conventional-commits --cd-version prerelease --preid alpha
```

Useful flags:

* `--cd-version prerelease`
* `--preid <id>`, typically one of `alpha`, `beta`, `rc`, or `next`.
