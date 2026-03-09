interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  postsCount: number;
  isFollowing?: boolean;
}

interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
}

interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  hasLiked: boolean;
  location?: string;
}

interface Story {
  id: string;
  username: string;
  avatar: string;
  media: string;
  viewed: boolean;
}

// === Mock Data ===
const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    username: 'alex_skywalker',
    fullName: 'Alex Sky',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    bio: '📸 Visual Storyteller | Digital Nomad ✈️\nExploring the hidden gems of the world.',
    followers: 1250,
    following: 450,
    postsCount: 124,
  },
  {
    id: 'u2',
    username: 'sarah_design',
    fullName: 'Sarah Miller',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    bio: 'UI/UX Designer @ TechFlow | Art Enthusiast',
    followers: 8900,
    following: 210,
    postsCount: 56,
  }
];

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u2',
    username: 'sarah_design',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8bef99c1e?w=800',
    caption: 'Chasing sunsets in the mountains. 🏔️ #nature #adventure',
    likes: 1242,
    location: 'Swiss Alps',
    hasLiked: false,
    timestamp: '2h ago',
    comments: [
      { id: 'c1', username: 'john_doe', text: 'Stunning view!', timestamp: '1h ago', likes: 2 },
      { id: 'c2', username: 'mike_travels', text: 'Where exactly is this?', timestamp: '30m ago', likes: 0 }
    ]
  },
  {
    id: 'p2',
    userId: 'u1',
    username: 'alex_skywalker',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    imageUrl: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800',
    caption: 'Modern architecture is just different. 🏛️',
    likes: 856,
    location: 'San Francisco, CA',
    hasLiked: true,
    timestamp: '5h ago',
    comments: []
  },
  {
    id: 'p3',
    userId: 'u3',
    username: 'nature_lover',
    userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
    caption: 'The forest whispers secrets if you listen closely. 🌲✨',
    likes: 2103,
    location: 'Pacific Northwest',
    hasLiked: false,
    timestamp: '8h ago',
    comments: [
      { id: 'c3', username: 'sarah_design', text: 'The lighting is perfect!', timestamp: '2h ago', likes: 12 }
    ]
  }
];

const INITIAL_STORIES: Story[] = [
  { id: 's1', username: 'Your Story', avatar: INITIAL_USERS[0].avatar, media: INITIAL_POSTS[0].imageUrl, viewed: false },
  { id: 's2', username: 'sarah_design', avatar: INITIAL_USERS[1].avatar, media: INITIAL_POSTS[1].imageUrl, viewed: false },
  { id: 's3', username: 'mike_travels', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', media: INITIAL_POSTS[2].imageUrl, viewed: false },
  { id: 's4', username: 'art_daily', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', media: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', viewed: false },
];

// === Components ===

const StoryBar = ({ onStoryClick }: { onStoryClick: (story: Story) => void }) => (
  <div className="flex bg-white dark:bg-zinc-950 border-b dark:border-zinc-800 p-4 space-x-4 overflow-x-auto no-scrollbar lg:bg-transparent lg:border-none lg:px-0">
    {INITIAL_STORIES.map((story) => (
      <button 
        key={story.id} 
        onClick={() => onStoryClick(story)}
        className="flex flex-col items-center flex-shrink-0 space-y-1"
      >
        <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
          <div className="p-0.5 bg-white dark:bg-zinc-950 rounded-full">
            <Avatar className="w-14 h-14 md:w-16 md:h-16 border dark:border-zinc-800">
              <AvatarImage src={story.avatar} />
              <AvatarFallback>{story.username[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <span className="text-[10px] md:text-xs truncate w-14 md:w-16 text-center dark:text-zinc-400">{story.username}</span>
      </button>
    ))}
  </div>
);

const FeedItem = ({ post, onLike, onComment }: { post: Post, onLike: (id: string) => void, onComment: (id: string, text: string) => void }) => {
  const [commentText, setCommentText] = useState('');
  const [showHeart, setShowHeart] = useState(false);
  const lastTapRef = useRef<number>(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (!post.hasLiked) onLike(post.id);
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    }
    lastTapRef.current = now;
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
      toast.success("Comment posted!");
    }
  };

  return (
    <Card className="mb-4 md:mb-8 border-none md:border md:border-zinc-200 dark:md:border-zinc-800 rounded-none sm:rounded-lg overflow-hidden dark:bg-zinc-950">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={post.userAvatar} />
            <AvatarFallback>{post.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold dark:text-zinc-100 leading-none">{post.username}</p>
            {post.location && <p className="text-[11px] text-zinc-500 mt-0.5">{post.location}</p>}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-5 h-5" /></Button>
      </div>

      <div className="relative aspect-square bg-zinc-100 dark:bg-zinc-900 overflow-hidden group w-full" onClick={handleDoubleTap}>
        <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover select-none" />
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center animate-in zoom-in duration-300 pointer-events-none">
            <Heart className="w-20 h-20 md:w-24 md:h-24 text-white fill-white drop-shadow-lg" />
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button onClick={() => onLike(post.id)} className="hover:opacity-60 transition-opacity">
              <Heart className={cn("w-6 h-6", post.hasLiked ? "fill-red-500 text-red-500" : "dark:text-zinc-100")} />
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:opacity-60 transition-opacity"><Mail className="w-6 h-6 dark:text-zinc-100" /></button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader><DialogTitle>Comments</DialogTitle></DialogHeader>
                <ScrollArea className="h-[300px] md:h-[400px] pr-4">
                  {post.comments.length > 0 ? (
                    post.comments.map(c => (
                      <div key={c.id} className="flex gap-3 mb-4">
                        <Avatar className="w-8 h-8 flex-shrink-0"><AvatarFallback>{c.username[0]}</AvatarFallback></Avatar>
                        <div>
                          <p className="text-sm dark:text-zinc-200"><span className="font-bold mr-2">{c.username}</span>{c.text}</p>
                          <p className="text-xs text-zinc-500 mt-1">{c.timestamp}</p>
                        </div>
                      </div>
                    ))
                  ) : <div className="text-center text-zinc-500 py-10">No comments yet.</div>}
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <button className="hover:opacity-60 transition-opacity"><Send className="w-6 h-6 dark:text-zinc-100" /></button>
          </div>
          <button className="hover:opacity-60 transition-opacity flex">
            <Zap className="w-6 h-6 dark:text-zinc-100" />
          </button>
        </div>

        <p className="font-bold text-sm mb-1 dark:text-zinc-100">{post.likes.toLocaleString()} likes</p>
        <p className="text-sm dark:text-zinc-200">
          <span className="font-bold mr-2">{post.username}</span>
          {post.caption}
        </p>

        {post.comments.length > 0 && (
          <button className="text-zinc-500 text-sm mt-1.5 hover:underline" onClick={() => {}}>
            View all {post.comments.length} comments
          </button>
        )}
        <p className="text-[10px] uppercase text-zinc-500 mt-2 tracking-wide font-medium">{post.timestamp}</p>
      </div>

      <form onSubmit={submitComment} className="border-t dark:border-zinc-800 p-3 hidden md:flex gap-4 items-center">
        <Input 
          className="flex-1 bg-transparent border-none focus-visible:ring-0 text-sm p-0 h-auto dark:text-zinc-100 placeholder:text-zinc-400" 
          placeholder="Add a comment..." 
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button 
          type="submit" 
          variant="ghost" 
          disabled={!commentText.trim()} 
          className="text-blue-500 font-semibold p-0 h-auto hover:bg-transparent disabled:opacity-30"
        >
          Post
        </Button>
      </form>
    </Card>
  );
};

export default function GramFlow() {
  const [view, setView] = useState<'home' | 'search' | 'create' | 'profile'>('home');
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [user, setUser] = useState<User>(INITIAL_USERS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [newPostCaption, setNewPostCaption] = useState('');

  const navigateTo = (newView: typeof view) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  // === Handlers ===
  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          hasLiked: !p.hasLiked,
          likes: p.hasLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: string, text: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, {
            id: Math.random().toString(),
            username: user.username,
            text,
            timestamp: 'Just now',
            likes: 0
          }]
        };
      }
      return p;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadPreview) return;
    
    const newPost: Post = {
      id: Math.random().toString(),
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      imageUrl: uploadPreview,
      caption: newPostCaption,
      likes: 0,
      hasLiked: false,
      timestamp: 'Just now',
      comments: []
    };

    setPosts([newPost, ...posts]);
    setUser(prev => ({ ...prev, postsCount: prev.postsCount + 1 }));
    navigateTo('home');
    setUploadPreview(null);
    setNewPostCaption('');
    toast.success("Post shared successfully!");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // === View Sections ===

  const HomeView = () => (
    <div className="max-w-[100vw] overflow-x-hidden md:max-w-2xl mx-auto flex flex-col items-center">
      <div className="w-full max-w-xl">
        <StoryBar onStoryClick={setActiveStory} />
        <div className="py-0 md:py-4 w-full">
          {posts.map(post => (
            <FeedItem key={post.id} post={post} onLike={handleLike} onComment={handleAddComment} />
          ))}
        </div>
      </div>
    </div>
  );

  const SearchView = () => {
    const filteredPosts = posts.filter(p => 
      p.caption.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
      <div className="max-w-5xl mx-auto px-1 md:px-4 py-4 mb-20">
        <div className="relative mb-6 px-3 md:px-0">
          <Search className="absolute left-6 md:left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <Input 
            className="pl-10 bg-zinc-100 dark:bg-zinc-900 border-none rounded-lg" 
            placeholder="Search posts, people, tags..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-[1px] md:gap-4">
          {filteredPosts.map(post => (
            <div key={post.id} className="aspect-square bg-zinc-200 dark:bg-zinc-800 relative group cursor-pointer overflow-hidden rounded-none md:rounded-sm">
              <img src={post.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 opacity-0 md:group-hover:opacity-100 flex items-center justify-center text-white gap-2 md:gap-4 transition-opacity">
                <div className="flex items-center gap-1 font-bold text-xs md:text-base"><Heart className="w-4 h-4 md:w-5 md:h-5 fill-white" /> {post.likes}</div>
                <div className="flex items-center gap-1 font-bold text-xs md:text-base"><Mail className="w-4 h-4 md:w-5 md:h-5 fill-white" /> {post.comments.length}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CreateView = () => (
    <div className="max-w-lg mx-auto px-4 py-4 md:py-8 mb-20">
      <Card className="dark:bg-zinc-950 dark:border-zinc-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Create New Post</CardTitle>
          <CardDescription>Share a moment with your followers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div 
            className="aspect-square w-full border-2 border-dashed dark:border-zinc-800 rounded-lg flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 overflow-hidden relative group cursor-pointer transition-colors hover:border-blue-500"
            onClick={() => document.getElementById('post-upload')?.click()}
          >
            {uploadPreview ? (
              <img src={uploadPreview} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                  <Image className="w-8 h-8 text-zinc-400 group-hover:text-blue-500" />
                </div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">Choose a photo</p>
                <p className="text-xs text-zinc-500 mt-1">PNG, JPG up to 10MB</p>
              </div>
            )}
            <input type="file" id="post-upload" className="hidden" accept="image/*" onChange={handleFileUpload} />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Caption</Label>
            <Textarea 
              placeholder="What's on your mind?" 
              value={newPostCaption}
              onChange={(e) => setNewPostCaption(e.target.value)}
              className="resize-none h-24 dark:bg-zinc-900 dark:border-zinc-800 focus-visible:ring-1 focus-visible:ring-blue-500"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between md:justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={() => navigateTo('home')} className="md:px-8">Cancel</Button>
          <Button onClick={handleCreatePost} disabled={!uploadPreview} className="md:px-8 bg-blue-600 hover:bg-blue-700 text-white">Share Post</Button>
        </CardFooter>
      </Card>
    </div>
  );

  const ProfileView = () => (
    <div className="max-w-4xl mx-auto py-4 md:py-8 px-4 mb-20">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-8 md:mb-12">
        <div className="relative group">
          <Avatar className="w-24 h-24 md:w-36 md:h-36 border-2 border-zinc-100 dark:border-zinc-800 shadow-inner">
            <AvatarImage src={user.avatar} className="object-cover" />
            <AvatarFallback>{user.username[0]}</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
            <Plus className="text-white w-8 h-8" />
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left w-full">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <h1 className="text-xl font-medium dark:text-zinc-100">{user.username}</h1>
            <div className="flex gap-2 justify-center md:justify-start">
              <Button size="sm" variant="secondary" className="font-semibold px-4" onClick={() => toast("Feature disabled in demo")}>Edit Profile</Button>
              <Button size="sm" variant="secondary" className="px-2 aspect-square"><Settings className="w-4 h-4" /></Button>
            </div>
          </div>
          
          <div className="flex justify-around md:justify-start md:gap-10 border-y md:border-none py-3 md:py-0 mb-6 border-zinc-100 dark:border-zinc-900">
            <div className="flex flex-col md:flex-row gap-1 items-center md:items-baseline">
              <span className="font-bold dark:text-zinc-100">{user.postsCount}</span>
              <span className="text-xs md:text-sm text-zinc-500 md:ml-1">posts</span>
            </div>
            <div className="flex flex-col md:flex-row gap-1 items-center md:items-baseline">
              <span className="font-bold dark:text-zinc-100">{user.followers.toLocaleString()}</span>
              <span className="text-xs md:text-sm text-zinc-500 md:ml-1">followers</span>
            </div>
            <div className="flex flex-col md:flex-row gap-1 items-center md:items-baseline">
              <span className="font-bold dark:text-zinc-100">{user.following.toLocaleString()}</span>
              <span className="text-xs md:text-sm text-zinc-500 md:ml-1">following</span>
            </div>
          </div>
          
          <div className="px-2 md:px-0">
            <p className="font-bold text-sm dark:text-zinc-100 mb-0.5">{user.fullName}</p>
            <p className="text-sm whitespace-pre-line leading-relaxed dark:text-zinc-300">{user.bio}</p>
          </div>
        </div>
      </div>

      <Separator className="mb-2 md:mb-8 dark:bg-zinc-900" />
      
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full justify-around bg-transparent border-none p-0 h-12">
          <TabsTrigger value="posts" className="flex-1 md:flex-none gap-2 px-4 md:px-10 data-[state=active]:border-t-2 border-zinc-900 dark:border-zinc-100 rounded-none h-full transition-all">
            <Image className="w-4 h-4" /> <span className="hidden md:inline text-[11px] tracking-widest font-bold">POSTS</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex-1 md:flex-none gap-2 px-4 md:px-10 data-[state=active]:border-t-2 border-zinc-900 dark:border-zinc-100 rounded-none h-full transition-all">
            <Heart className="w-4 h-4" /> <span className="hidden md:inline text-[11px] tracking-widest font-bold">SAVED</span>
          </TabsTrigger>
          <TabsTrigger value="tagged" className="flex-1 md:flex-none gap-2 px-4 md:px-10 data-[state=active]:border-t-2 border-zinc-900 dark:border-zinc-100 rounded-none h-full transition-all">
            <User className="w-4 h-4" /> <span className="hidden md:inline text-[11px] tracking-widest font-bold">TAGGED</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-1 md:mt-6">
          <div className="grid grid-cols-3 gap-[1px] md:gap-4 lg:gap-8">
            {posts.filter(p => p.userId === user.id).map(post => (
              <div key={post.id} className="aspect-square bg-zinc-200 dark:bg-zinc-800 relative group cursor-pointer overflow-hidden">
                <img src={post.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/30 opacity-0 md:group-hover:opacity-100 flex items-center justify-center text-white gap-2 md:gap-6 transition-opacity">
                  <div className="flex items-center gap-1 font-bold text-xs md:text-base"><Heart className="w-4 h-4 md:w-5 md:h-5 fill-white" /> {post.likes}</div>
                  <div className="flex items-center gap-1 font-bold text-xs md:text-base"><Mail className="w-4 h-4 md:w-5 md:h-5 fill-white" /> {post.comments.length}</div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="saved" className="mt-20 text-center">
            <div className="max-w-[280px] mx-auto text-zinc-500">
                <Heart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-xl font-bold dark:text-white">Save photos and videos</p>
                <p className="text-sm mt-2">When you save photos and videos, they'll appear here.</p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className={cn("min-h-screen", isDarkMode ? "dark bg-zinc-950 text-zinc-50" : "bg-white md:bg-zinc-50 text-zinc-900")}>
      {/* Header Desktop & Mobile */}
      <nav className="sticky top-0 z-[60] bg-white dark:bg-zinc-950 border-b dark:border-zinc-800 h-14 md:h-16 flex items-center px-4 w-full">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <h1 
            className="text-xl md:text-2xl font-bold font-serif tracking-tight cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            GramFlow
          </h1>
          
          <div className="hidden md:flex relative flex-1 max-w-[250px] mx-8">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input 
              className="pl-9 py-1 h-9 bg-zinc-100 dark:bg-zinc-900 border-none rounded-md w-full focus-visible:ring-1 focus-visible:ring-zinc-400" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 md:gap-5">
            <Button variant="ghost" size="icon" className="md:flex" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun className="w-5 h-5 md:w-6 md:h-6" /> : <Moon className="w-5 h-5 md:w-6 md:h-6" />}
            </Button>
            <Bell className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:opacity-70 transition-opacity" onClick={() => toast("3 new notifications from today")} />
            <div className="md:hidden">
               <Send className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="min-h-screen pt-0 md:pt-6">
        {view === 'home' && <HomeView />}
        {view === 'search' && <SearchView />}
        {view === 'create' && <CreateView />}
        {view === 'profile' && <ProfileView />}
      </main>

      {/* Navigation - Bottom for Mobile, Left/Right layout for wide screens technically doable but following standard Instagram approach */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 border-t dark:border-zinc-800 z-[60] h-14 md:h-16 flex items-center justify-around px-2 max-w-full md:max-w-2xl mx-auto md:mb-4 md:rounded-2xl md:shadow-2xl md:border">
        <button onClick={() => navigateTo('home')} className={cn("p-3 flex-1 flex justify-center transition-all", view === 'home' ? "scale-110" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200")}>
          <Home className={cn("w-6 h-6", view === 'home' && "fill-current text-zinc-900 dark:text-white")} />
        </button>
        <button onClick={() => navigateTo('search')} className={cn("p-3 flex-1 flex justify-center transition-all", view === 'search' ? "scale-110" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200")}>
          <Search className={cn("w-6 h-6", view === 'search' && "stroke-[3px] text-zinc-900 dark:text-white")} />
        </button>
        <button onClick={() => navigateTo('create')} className={cn("p-3 flex-1 flex justify-center group")}>
          <Plus className={cn("w-8 h-8 md:w-9 md:h-9 bg-zinc-100 dark:bg-zinc-900 rounded-xl p-1.5 border dark:border-zinc-800 group-hover:scale-110 transition-transform", view === 'create' ? "bg-zinc-900 text-white dark:bg-white dark:text-black" : "text-zinc-500")} />
        </button>
        <button onClick={() => toast("Favorites coming soon!")} className="p-3 flex-1 flex justify-center text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">
          <Heart className="w-6 h-6" />
        </button>
        <button onClick={() => navigateTo('profile')} className={cn("p-2.5 flex-1 flex justify-center transition-all")}>
          <div className={cn("p-[1.5px] rounded-full", view === 'profile' ? "bg-zinc-900 dark:bg-white scale-110" : "bg-transparent")}>
            <div className="p-[1px] bg-white dark:bg-zinc-950 rounded-full">
              <Avatar className="w-6 h-6">
                <AvatarImage src={user.avatar} className="object-cover" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </button>
      </div>

      {/* Story Viewer Overlay */}
      {activeStory && (
        <div className="fixed inset-0 z-[100] bg-black md:bg-zinc-900/95 flex flex-col items-center justify-center animate-in fade-in duration-200">
          {/* Progress Bar Container */}
          <div className="absolute top-2 md:top-4 left-2 right-2 md:left-4 md:right-4 flex gap-1 z-[110]">
             <div className="h-[2px] md:h-1 flex-1 bg-zinc-600/50 rounded overflow-hidden">
                <div className="h-full bg-white animate-progress-story" onAnimationEnd={() => setActiveStory(null)} />
             </div>
          </div>
          
          {/* Header */}
          <div className="absolute top-6 left-4 md:top-10 md:left-6 flex items-center gap-3 z-[110]">
            <Avatar className="w-8 h-8 border border-white/20">
              <AvatarImage src={activeStory.avatar} className="object-cover" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-white font-bold text-sm leading-none">{activeStory.username}</span>
                <span className="text-white/60 text-[10px] mt-1">2h ago</span>
            </div>
          </div>
          
          <button className="absolute top-6 right-4 md:top-10 md:right-6 z-[110] text-white/80 hover:text-white" onClick={() => setActiveStory(null)}>
            <X className="w-8 h-8" />
          </button>
          
          {/* Media Content */}
          <div className="w-full h-full md:h-[90vh] md:max-w-[450px] md:rounded-xl md:shadow-2xl relative overflow-hidden flex items-center bg-black">
            <img src={activeStory.media} alt="Story content" className="w-full h-auto max-h-full object-contain" />
          </div>

          {/* Social Interactions */}
          <div className="absolute bottom-6 md:bottom-10 left-0 right-0 px-6 flex gap-4 max-w-lg mx-auto z-[110]">
             <Input 
                className="bg-transparent border-white/30 text-white placeholder:text-white/50 rounded-full h-11 focus-visible:ring-white/30" 
                placeholder={`Reply to ${activeStory.username}...`} 
                autoFocus 
             />
             <div className="flex gap-4 items-center">
                 <button className="text-white hover:scale-110 transition-transform"><Heart className="w-7 h-7" /></button>
                 <button className="text-white hover:scale-110 transition-transform"><Send className="w-7 h-7" /></button>
             </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes story-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress-story {
          animation: story-progress 6s linear forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 640px) {
            body {
                overscroll-behavior-y: contain;
            }
        }
      `}</style>
    </div>
  );
}