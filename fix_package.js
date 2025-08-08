const fs=require(fs);
const p=/workspace/package.json;
const j=JSON.parse(fs.readFileSync(p,utf8));
j.name=rob04-connect;
j.private=true;
j.workspaces=[apps/*,packages/*];
j.scripts=j.scripts||{};
j.scripts.dev=echo
