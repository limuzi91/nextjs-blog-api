const { prisma } = require("./prisma/generated/prisma-client");

const port = process.env.PORT || 5000;

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get(`/posts/published`, async (req, res) => {
  const publishedPosts = await prisma.posts({ where: { published: true } });
  res.json(publishedPosts);
});

app.get("/post/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await prisma.post({ id: postId });
  res.json(post);
});

app.get("/posts/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const postsByUser = await prisma.user({ id: userId }).posts();
  res.json(postsByUser);
});

app.post("/user", async (req, res) => {
  const newUser = await prisma.createUser(req.body);
  res.json(newUser);
});

app.post("/post/draft", async (req, res) => {
  const newPost = await prisma.createPost(req.body);
  res.json(newPost);
});

app.put(`/post/publish/:postId`, async (req, res) => {
  const { postId } = req.params;
  const updatedPost = await prisma.updatePost({
    where: { id: postId },
    data: { published: true },
  });
  res.json(updatedPost);
});

app.listen(port, () => console.log(`Server is running on ${port}`));
