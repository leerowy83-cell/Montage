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
  <div className="flex bg-white dark:bg-zinc-950 border-b dark:border-zinc-800 p-4 space-x-4 overflow-x-auto no-scrollbar">
    {INITIAL_STORIES.map((story) => (
      <button 
        key={story.id} 
        onClick={() => onStoryClick(story)}
        className="flex flex-col items-center flex-shrink-0 space-y-1"
      >
        <div className="p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
          <div className="p-0.5 bg-white dark:bg-zinc-950 rounded-full">
            <Avatar className="w-16 h-16 border dark:border-zinc-800">
              <AvatarImage src={story.avatar} />
              <AvatarFallback>{story.username[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <span className="text-xs truncate w-16 text-center dark:text-zinc-400">{story.username}</span>
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
    <Card className="mb-6 border-none rounded-none sm:rounded-lg overflow-hidden dark:bg-zinc-950 dark:border-zinc-800">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={post.userAvatar} />
            <AvatarFallback>{post.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold dark:text-zinc-100">{post.username}</p>
            {post.location && <p className="text-xs text-zinc-500">{post.location}</p>}
          </div>
        </div>
        <Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5" /></Button>
      </div>

      <div className="relative aspect-square bg-zinc-100 dark:bg-zinc-900 overflow-hidden group" onClick={handleDoubleTap}>
        <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" />
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center animate-in zoom-in duration-300">
            <Heart className="w-24 h-24 text-white fill-white drop-shadow-lg" />
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button onClick={() => onLike(post.id)}>
              <Heart className={cn("w-6 h-6 transition-colors", post.hasLiked ? "fill-red-500 text-red-500" : "dark:text-zinc-100")} />
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button><Mail className="w-6 h-6 dark:text-zinc-100" /></button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader><DialogTitle>Comments</DialogTitle></DialogHeader>
                <ScrollArea className="h-[400px] pr-4">
                  {post.comments.length > 0 ? (
                    post.comments.map(c => (
                      <div key={c.id} className="flex gap-3 mb-4">
                        <Avatar className="w-8 h-8"><AvatarFallback>{c.username[0]}</AvatarFallback></Avatar>
                        <div>
                          <p className="text-sm"><span className="font-bold mr-2">{c.username}</span>{c.text}</p>
                          <p className="text-xs text-zinc-500 mt-1">{c.timestamp}</p>
                        </div>
                      </div>
                    ))
                  ) : <div className="text-center text-zinc-500 py-10">No comments yet.</div>}
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <Send className="w-6 h-6 dark:text-zinc-100" />
          </div>
          <Zap className="w-6 h-6 dark:text-zinc-100" />
        </div>

        <p className="font-bold text-sm mb-1 dark:text-zinc-100">{post.likes.toLocaleString()} likes</p>
        <p className="text-sm dark:text-zinc-200">
          <span className="font-bold mr-2">{post.username}</span>
          {post.caption}
        </p>

        {post.comments.length > 0 && (
          <button className="text-zinc-500 text-sm mt-1" onClick={() => {}}>
            View all {post.comments.length} comments
          </button>
        )}
        <p className="text-[10px] uppercase text-zinc-500 mt-1">{post.timestamp}</p>
      </div>

      <form onSubmit={submitComment} className="border-t dark:border-zinc-800 p-3 flex gap-2">
        <Input 
          className="flex-1 bg-transparent border-none focus-visible:ring-0 text-sm p-0 h-auto dark:text-zinc-100" 
          placeholder="Add a comment..." 
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button 
          type="submit" 
          variant="ghost" 
          disabled={!commentText.trim()} 
          className="text-blue-500 font-semibold p-0 h-auto hover:bg-transparent disabled:opacity-50"
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
    setView('home');
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

  // === Views ===

  const HomeView = () => (
    <div className="max-w-xl mx-auto">
      <StoryBar onStoryClick={setActiveStory} />
      <div className="py-4">
        {posts.map(post => (
          <FeedItem key={post.id} post={post} onLike={handleLike} onComment={handleAddComment} />
        ))}
      </div>
    </div>
  );

  const SearchView = () => {
    const filteredPosts = posts.filter(p => p.caption.toLowerCase().includes(searchQuery.toLowerCase()) || p.username.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <Input 
            className="pl-10 bg-zinc-100 dark:bg-zinc-900 border-none rounded-lg" 
            placeholder="Search posts, people, tags..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {filteredPosts.map(post => (
            <div key={post.id} className="aspect-square bg-zinc-200 dark:bg-zinc-800 relative group cursor-pointer overflow-hidden rounded-sm">
              <img src={post.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white gap-4 transition-opacity">
                <div className="flex items-center gap-1 font-bold"><Heart className="w-5 h-5 fill-white" /> {post.likes}</div>
                <div className="flex items-center gap-1 font-bold"><Mail className="w-5 h-5 fill-white" /> {post.comments.length}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CreateView = () => (
    <div className="max-w-lg mx-auto px-4 py-8">
      <Card className="dark:bg-zinc-950 dark:border-zinc-800">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Share a moment with your followers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div 
            className="aspect-square w-full border-2 border-dashed dark:border-zinc-800 rounded-lg flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 overflow-hidden relative"
            onClick={() => document.getElementById('post-upload')?.click()}
          >
            {uploadPreview ? (
              <img src={uploadPreview} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-6">
                <Image className="w-12 h-12 mx-auto text-zinc-400 mb-2" />
                <p className="text-sm text-zinc-500">Click to upload photo or video</p>
              </div>
            )}
            <input type="file" id="post-upload" className="hidden" accept="image/*" onChange={handleFileUpload} />
          </div>
          <div className="space-y-2">
            <Label>Caption</Label>
            <Textarea 
              placeholder="Write a caption..." 
              value={newPostCaption}
              onChange={(e) => setNewPostCaption(e.target.value)}
              className="dark:bg-zinc-900 dark:border-zinc-800"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setView('home')}>Cancel</Button>
          <Button onClick={handleCreatePost} disabled={!uploadPreview}>Share Post</Button>
        </CardFooter>
      </Card>
    </div>
  );

  const ProfileView = () => (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <Avatar className="w-20 h-20 md:w-40 md:h-40 border-2 border-zinc-100 dark:border-zinc-800">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.username[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h1 className="text-xl font-medium dark:text-zinc-100">{user.username}</h1>
            <div className="flex gap-2 justify-center md:justify-start">
              <Button size="sm" variant="secondary" onClick={() => toast("Profile edit features coming soon!")}>Edit Profile</Button>
              <Button size="sm" variant="secondary" className="px-3"><Settings className="w-4 h-4" /></Button>
            </div>
          </div>
          <div className="flex justify-center md:justify-start gap-8 mb-4">
            <span className="dark:text-zinc-100"><strong>{user.postsCount}</strong> posts</span>
            <span className="dark:text-zinc-100"><strong>{user.followers}</strong> followers</span>
            <span className="dark:text-zinc-100"><strong>{user.following}</strong> following</span>
          </div>
          <div>
            <p className="font-bold dark:text-zinc-100">{user.fullName}</p>
            <p className="text-sm whitespace-pre-line dark:text-zinc-300">{user.bio}</p>
          </div>
        </div>
      </div>

      <Separator className="mb-8 dark:bg-zinc-800" />
      
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full justify-center bg-transparent border-none">
          <TabsTrigger value="posts" className="flex gap-2 px-10 data-[state=active]:border-t-2 border-zinc-900 dark:border-zinc-100 rounded-none"><Image className="w-4 h-4" /> POSTS</TabsTrigger>
          <TabsTrigger value="saved" className="flex gap-2 px-10 data-[state=active]:border-t-2 border-zinc-900 dark:border-zinc-100 rounded-none"><Heart className="w-4 h-4" /> SAVED</TabsTrigger>
          <TabsTrigger value="tagged" className="flex gap-2 px-10 data-[state=active]:border-t-2 border-zinc-900 dark:border-zinc-100 rounded-none"><User className="w-4 h-4" /> TAGGED</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {posts.filter(p => p.userId === user.id).map(post => (
              <div key={post.id} className="aspect-square bg-zinc-200 dark:bg-zinc-800 relative group cursor-pointer">
                <img src={post.imageUrl} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white gap-6">
                  <div className="flex items-center gap-1 font-bold"><Heart className="w-5 h-5 fill-white" /> {post.likes}</div>
                  <div className="flex items-center gap-1 font-bold"><Mail className="w-5 h-5 fill-white" /> {post.comments.length}</div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className={cn("min-h-screen", isDarkMode ? "dark bg-zinc-950" : "bg-zinc-50")}>
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-zinc-950 border-b dark:border-zinc-800 h-16 flex items-center px-4">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <h1 className="text-2xl font-bold font-serif tracking-tight dark:text-zinc-100">GramFlow</h1>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input className="w-64 pl-9 py-1 h-9 bg-zinc-100 dark:bg-zinc-900 border-none rounded-md" placeholder="Search" />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun className="w-6 h-6 text-zinc-100" /> : <Moon className="w-6 h-6" />}
            </Button>
            <Bell className="w-6 h-6 cursor-pointer dark:text-zinc-100" onClick={() => toast("You have 3 new notifications")} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-20 pt-2 lg:pt-6">
        {view === 'home' && <HomeView />}
        {view === 'search' && <SearchView />}
        {view === 'create' && <CreateView />}
        {view === 'profile' && <ProfileView />}
      </main>

      {/* Navigation Bar (Mobile-first Floating) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 border-t dark:border-zinc-800 z-50 h-16 flex items-center justify-around px-4 max-w-xl mx-auto sm:rounded-tl-2xl sm:rounded-tr-2xl sm:bottom-0 sm:border-x">
        <button onClick={() => setView('home')} className={cn("p-2 transition-colors", view === 'home' ? "text-primary" : "text-zinc-400")}>
          <Home className={cn("w-7 h-7", view === 'home' && "fill-current")} />
        </button>
        <button onClick={() => setView('search')} className={cn("p-2 transition-colors", view === 'search' ? "text-primary" : "text-zinc-400")}>
          <Search className={cn("w-7 h-7", view === 'search' && "stroke-[3px]")} />
        </button>
        <button onClick={() => setView('create')} className={cn("p-2 transition-colors", view === 'create' ? "text-primary" : "text-zinc-400")}>
          <Plus className={cn("w-7 h-7 bg-zinc-100 dark:bg-zinc-900 rounded-lg p-1 border dark:border-zinc-800", view === 'create' && "bg-primary text-white")} />
        </button>
        <button onClick={() => toast("Marketplace coming soon!")} className="p-2 text-zinc-400">
          <Heart className="w-7 h-7" />
        </button>
        <button onClick={() => setView('profile')} className={cn("p-1.5 transition-colors rounded-full border-2", view === 'profile' ? "border-zinc-900 dark:border-zinc-100" : "border-transparent")}>
          <Avatar className="w-6 h-6">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </button>
      </div>

      {/* Story Viewer Overlay */}
      {activeStory && (
        <div className="fixed inset-0 z-[100] bg-zinc-900 flex flex-col items-center justify-center group">
          <div className="absolute top-4 left-4 right-4 flex gap-1 z-[110]">
             <div className="h-1 flex-1 bg-zinc-600 rounded overflow-hidden">
                <div className="h-full bg-white animate-progress" style={{ animationDuration: '5s' }} />
             </div>
          </div>
          <div className="absolute top-10 left-4 flex items-center gap-3 z-[110]">
            <Avatar className="w-8 h-8 border border-white/20">
              <AvatarImage src={activeStory.avatar} />
            </Avatar>
            <span className="text-white font-semibold text-sm">{activeStory.username}</span>
          </div>
          <button className="absolute top-10 right-4 z-[110] text-white" onClick={() => setActiveStory(null)}>
            <X className="w-8 h-8" />
          </button>
          
          <div className="w-full max-w-lg aspect-[9/16] bg-black shadow-2xl relative">
            <img src={activeStory.media} alt="Story content" className="w-full h-full object-contain" />
          </div>

          <div className="absolute bottom-8 left-0 right-0 px-4 flex gap-4 max-w-lg mx-auto z-[110]">
             <Input className="bg-transparent border-white/40 text-white placeholder:text-white/60 rounded-full h-11" placeholder={`Reply to ${activeStory.username}...`} />
             <Button variant="ghost" className="text-white">
               <Send className="w-6 h-6" />
             </Button>
          </div>
        </div>
      )}

      {/* Custom Global Styles for Animations */}
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress linear forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}