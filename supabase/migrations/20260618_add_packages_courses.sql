-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    city TEXT NOT NULL,
    details TEXT NOT NULL DEFAULT '',
    duration TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    highlights JSONB NOT NULL DEFAULT '[]',
    dates JSONB NOT NULL DEFAULT '[]',
    featured BOOLEAN NOT NULL DEFAULT false,
    accent TEXT NOT NULL DEFAULT 'from-blue-600',
    image TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    level TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    icon TEXT NOT NULL DEFAULT 'BookOpen',
    color TEXT NOT NULL DEFAULT 'from-cyan-500 to-blue-600',
    image TEXT NOT NULL DEFAULT '',
    duration TEXT NOT NULL DEFAULT '',
    highlights JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Packages RLS policies
CREATE POLICY "Anyone can read packages"
    ON packages FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert packages"
    ON packages FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update packages"
    ON packages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete packages"
    ON packages FOR DELETE TO authenticated USING (true);

-- Courses RLS policies
CREATE POLICY "Anyone can read courses"
    ON courses FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert courses"
    ON courses FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update courses"
    ON courses FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete courses"
    ON courses FOR DELETE TO authenticated USING (true);

-- Auto-update triggers (reuses the existing handle_updated_at function)
DROP TRIGGER IF EXISTS on_packages_updated ON packages;
CREATE TRIGGER on_packages_updated
    BEFORE UPDATE ON packages
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_courses_updated ON courses;
CREATE TRIGGER on_courses_updated
    BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
